import { getChallengeId } from "../adapters/challengesFetch";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import { fetchHandler, getPostOptions } from "../utils/fetchingUtils";
import { addParticipant } from "../adapters/participants-adapter";

function ChallengeInfo() {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const { currentUser } = useContext(CurrentUserContext);

  console.log({ currentUser });

  const navigate = useNavigate();
  if (!currentUser) {
    console.log("No current user, redirecting to login");
    navigate("/login");
  }

  useEffect(() => {
    const getChallengeInfo = async () => {
      try {
        const [data, error] = await getChallengeId(id);

        if (error) {
          console.error("Error fetching challenge:", error);
          return;
        }

        setChallenge(data);
      } catch (error) {
        console.error("Error fetching challenge:", error);
      }
    };
    getChallengeInfo();
  }, [id]);
  const handleJoin = async () => {
    const user_id = currentUser.id;
    let challenge_id = Number(id);
    console.log("user_id:", user_id);
    console.log("challenge_id:", challenge_id);

    const [data, error] = await addParticipant({ user_id, challenge_id });
    if (error) {
      console.error("Error adding participant:", error);
      return;
    }
  };

  if (!challenge) return <p>Loading...</p>;

  return (
    <>
      <h2>{challenge.title}</h2>
      <p>Description: {challenge.description}</p>
      <p>Start Date: {challenge.created_at}</p>
      <p>End: {challenge.end_time}</p>
      <button onClick={handleJoin}>Join</button>
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
        <button onClick={handleJoin}>Join</button>

        <Link to={"/challenges"}>
          <button>Back to Challenges</button>
        </Link>
      </div>
    </>
  );
}

export default ChallengeInfo;
