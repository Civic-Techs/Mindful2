import { getChallengeId } from '../adapters/challengesFetch';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import CurrentUserContext from '../contexts/current-user-context';
import { fetchHandler, getPostOptions } from '../utils/fetchingUtils';

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
    const currentUserId = currentUser.id;
    console.log(currentUserId);
    // get info on the challenge
    try {
      // const [challengeData, error] = await getChallengeId(id);
      return await fetchHandler(
        `/api/participants`,
        getPostOptions({ id, currentUserId })
      );

      if (error) {
        console.error('Error fetching challenge:', error);
        return;
      }
    } catch (error) {}
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
