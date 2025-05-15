import { getChallengeId } from '../adapters/challengesFetch';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import CurrentUserContext from '../contexts/current-user-context';
import { fetchHandler, getPostOptions } from '../utils/fetchingUtils';
import { addParticipant } from '../adapters/participants-adapter';

function ChallengeInfo() {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const { currentUser } = useContext(CurrentUserContext);

  console.log({ currentUser });

  const navigate = useNavigate();
  if (!currentUser) {
    console.log('No current user, redirecting to login');
    navigate('/login');
  }

  useEffect(() => {
    const getChallengeInfo = async () => {
      try {
        const [data, error] = await getChallengeId(id);

        // CHECKING DATA
        console.log('challenge:', data);
        //CHECKING DATA

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
    console.log('user_id:', user_id);
    console.log('challenge_id:', challenge_id);

    const [data, error] = await addParticipant({ user_id, challenge_id });
    if (error) {
      console.error('Error adding participant:', error);
      return;
    }
  };

  if (!challenge) return <p>Loading...</p>;

  return (
    <>
      <h2>{challenge.title}</h2>
      <p>Description: {challenge.description}</p>
      <p>Contest: {challenge.contest ? 'yes' : 'no'}</p>
      <p>Winner:{challenge.winner ? 'yes' : 'no'}</p>
      <p>Start Date: {challenge.created_at}</p>
      <p>End: {challenge.end_time}</p>
      <button onClick={handleJoin}>Join</button>

      <Link to={'/challenges'}>
        <button>Back to Challenges</button>
      </Link>
    </>
  );
}

export default ChallengeInfo;
