import { getChallengeId } from '../adapters/challengesFetch';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import CurrentUserContext from '../contexts/current-user-context';
import { addParticipant } from '../adapters/participants-adapter';

function ChallengeInfo() {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
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

  const handleJoin = async () => {
    const user_id = currentUser.id;
    let challenge_id = Number(id);

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

  if (!challenge) return <p>Loading...</p>;

  return (
    <>
      <h2>{challenge.title}</h2>
      <p>Description: {challenge.description}</p>
      <p>Start Date: {challenge.created_at}</p>
      <p>End: {challenge.end_time}</p>
      <button onClick={handleJoin}>
        {isJoined ? 'Joined (Click to Unjoin)' : 'Join'}
      </button>
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
        <Link to={'/challenges'}>
          <button>Back to Challenges</button>
        </Link>
      </div>

      {/* Comment Section */}
      {showComments && (
        <div className="commentSection">
          <h3>Comments</h3>
          <textarea
            placeholder="Write a comment..."
            rows="4"
            cols="50"
          ></textarea>
          <button>Submit Comment</button>
          {/* Placeholder for displaying comments */}
          <div className="commentsList">
            <p>No comments yet. Be the first to comment!</p>
          </div>
        </div>
      )}
    </>
  );
}

export default ChallengeInfo;
