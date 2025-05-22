import { getChallengeId } from '../adapters/challengesFetch';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import CurrentUserContext from '../contexts/current-user-context';
import { fetchHandler, getPostOptions } from '../utils/fetchingUtils';
import { addParticipant } from '../adapters/participants-adapter';
import { getPostsByChallengeId } from '../adapters/postsFetch';
import {
  addComment,
  getCommentsByPostId,
  getAllComments,
} from '../adapters/commentsFetch'; // Import API functions

function ChallengeInfo() {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({}); // State to store comments for each post
  const [showComments, setShowComments] = useState(false); // State to toggle comment section
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
          filteredComments[post.id] = allComments.filter(
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

  const handleJoin = async () => {
    const user_id = currentUser.id;
    let challenge_id = Number(id);
    console.log('user_id:', user_id);
    console.log('challenge_id:', challenge_id);

    if (isJoined) {
      // Unjoin logic
      const [data, error] = await removeParticipant({ user_id, challenge_id });
      if (error) {
        console.error('Error removing participant:', error);
        return;
      }

      setIsJoined(false); // Mark as unjoined
      setShowComments(false); // Hide comment section
    } else {
      // Join logic
      const [data, error] = await addParticipant({ user_id, challenge_id });
      if (error) {
        console.error('Error adding participant:', error);
        return;
      }

      setIsJoined(true); // Mark as joined
      setShowComments(true); // Show comment section
    }
  };

  const handleCommentSubmit = async (postId, content) => {
    try {
      const [newComment, error] = await addComment({
        content,
        post_id: postId,
        user_id: currentUser.id,
      });
      if (error) {
        console.error('Error submitting comment:', error);
        return;
      }

      console.log('New Comment:', newComment);

      // // Update comments state with the new comment
      setComments((prevComments) => ({
        prevComments,
        [postId]: [prevComments[postId] || [], newComment],
        // Ensure fallback to an empty array
      }));
    } catch (error) {
      console.error('Error submitting comment:', error);
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
          <button onClick={handleJoin}>
            {isJoined ? 'Joined (Click to Unjoin)' : 'Join'}
          </button>
        </Link>
      </div>

      <hr />

      {/* Posts Section */}
      <h3>Posts for this Challenge:</h3>
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h4>{post.title}</h4>
              <p>{post.description}</p>
              {post.img && <img src={post.img} alt={post.title} width="200" />}
              <p>Votes: {post.votes}</p>

              {/* Comment Form */}
              <textarea
                id={`comment-input-${post.id}`}
                placeholder="Write a comment..."
                rows="4"
                cols="50"
              ></textarea>
              <button
                onClick={() => {
                  const content = document.getElementById(
                    `comment-input-${post.id}`
                  ).value;
                  if (content.trim()) {
                    handleCommentSubmit(post.id, content);
                    document.getElementById(`comment-input-${post.id}`).value =
                      '';
                  } else {
                    alert('Comment cannot be empty!');
                  }
                }}
              >
                Submit Comment
              </button>

              {/* Render Comments */}
              <h5>Comments:</h5>
              <ul>
                {comments[post.id]?.length > 0 ? (
                  comments[post.id].map((comment, index) => (
                    <li key={`${post.id}-${comment.id || index}`}>
                      <strong>{currentUser.username}:</strong> {comment.content}
                    </li>
                  ))
                ) : (
                  <p>No comments yet. Be the first to comment!</p>
                )}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default ChallengeInfo;
