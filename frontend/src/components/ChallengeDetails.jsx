import { getChallengeId } from '../adapters/challengesFetch';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import CurrentUserContext from '../contexts/current-user-context';
import { fetchHandler, getPostOptions } from '../utils/fetchingUtils';
import {
  addParticipant,
  getParticipantById,
} from '../adapters/participants-adapter';
import { getPostsByChallengeId, deletePost } from '../adapters/postsFetch';
import { getCommentsByPostId, getAllComments } from '../adapters/commentsFetch'; // Import API functions
import CommentsSection from './CommentsSection'; // Import CommentsSection component
import { use } from 'react';

function ChallengeInfo() {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({}); // State to store comments for each post
  // const [showComments, setShowComments] = useState(false); // State to toggle comment section
  const [isJoined, setIsJoined] = useState(false); // State to track if user has joined
  const { currentUser } = useContext(CurrentUserContext);

  const navigate = useNavigate();
  if (!currentUser) {
    navigate('/login');
  }

  useEffect(() => {
    const getChallengeInfo = async () => {
      try {
        const [data, error] = await getChallengeId(id);

        if (error) {
          console.error('Error fetching challenge:', error);
          return;
        }

        setChallenge(data);
      } catch (error) {
        console.error('Error fetching challenge:', error);
      }
    };
    getChallengeInfo();
  }, [id]);

  useEffect(() => {
    const checkIfJoined = async () => {
      try {
        const participants = await getParticipantById(currentUser.id);
        const isParticipant = participants.some(
          (participant) => participant.challenge_id === Number(id)
        );
        setIsJoined(isParticipant);
      } catch (error) {
        console.error('Error checking participant:', error);
      }
    };
    checkIfJoined();
  }, [currentUser, id]);

  const handleJoin = async () => {
    try {
      await addParticipant({
        user_id: currentUser.id,
        challenge_id: id,
      });
      setIsJoined(true);
    } catch (error) {
      console.error('Error joining challenge:', error);
    }
  };

  useEffect(() => {
    const herePosts = async () => {
      try {
        const [data, error] = await getPostsByChallengeId(id);

        if (error) {
          console.error('Error fetching posts:', error);
          return;
        }
        setPosts(data.posts);

        // Fetch comments for each post
        const commentsData = {};
        for (const post of data.posts) {
          const [postComments] = await getCommentsByPostId(post.id);
          commentsData[post.id] = postComments || [];
        }
        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    herePosts();
  }, [id]);

  useEffect(() => {
    const fetchAllComments = async () => {
      try {
        const [allComments, error] = await getAllComments();
        if (error) {
          console.error('Error fetching all comments:', error);
          return;
        }

        // Filter comments for posts in this challenge
        const filteredComments = {};
        posts.forEach((post) => {
          filteredComments[post.id] = allComments.comments.filter(
            (comment) => comment.post_id === post.id
          );
        });

        setComments(filteredComments);
      } catch (error) {
        console.error('Error fetching all comments:', error);
      }
    };

    if (posts.length > 0) {
      fetchAllComments();
    }
  }, [posts]);

  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      alert('Post deleted successfully.');
    } catch (error) {
      console.error('Failed to delete post:', error);
      alert('Failed to delete post.');
    }
  };

  if (!challenge) return <p>Loading...</p>;

  return (
    <>
      <h2>{challenge.title}</h2>

      <div className="challengeDetails">
        <p>
          <strong>Description:</strong> {challenge.description}
        </p>
        <p>
          <strong>Start Date:</strong> {challenge.created_at}
        </p>
        <p>
          <strong>End:</strong> {challenge.end_time}
        </p>
      </div>

      <div className="challengeActions">
        <Link to={`/challenges/${challenge.id}/posts`}>
          <button>Posts</button>
        </Link>
        <Link to={'/challenges'}>
          <button>Back to Challenges</button>
        </Link>
        <Link>
          <button
            onClick={handleJoin}
            disabled={isJoined} // Disable the button if the user is already a participant
            style={{
              backgroundColor: isJoined ? 'grey' : '#007bff',
              cursor: isJoined ? 'not-allowed' : 'pointer',
            }}
          >
            {isJoined ? 'Already Joined' : 'Join'}
          </button>
        </Link>
      </div>

      <hr />

      {/* Posts Section */}
      <h3>Posts for this Challenge:</h3>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <ul className="postsList">
          {posts.map((post) => (
            <li key={post.id} className="postItem">
              <h4>{post.title}</h4>
              <p>{post.description}</p>
              {post.img && <img src={post.img} alt={post.title} width="200" />}
              <p>Votes: {post.votes}</p>
              {/* Delete button */}
              {post.user_id === currentUser?.id && (
                <button
                  className="deleteButton"
                  onClick={() => handleDeletePost(post.id)}
                >
                  Delete Post
                </button>
              )}
              <CommentsSection postId={post.id} currentUser={currentUser} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default ChallengeInfo;
