import { getChallengeId } from "../adapters/challengesFetch";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ChallengeInfo() {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);

  useEffect(() => {
    const getChallengeInfo = async () => {
      try {
        const [data, error] = await getChallengeId(id);

        // CHECKING DATA
        console.log("challenge:", data);
        //CHECKING DATA

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

  if (!challenge) return <p>Loading...</p>;

  return (
    <>
      <h2>{challenge.title}</h2>
      <p>Description: {challenge.description}</p>
      <p>Contest: {challenge.contest ? "yes" : "no"}</p>
      <p>Winner:{challenge.winner ? "yes" : "no"}</p>
      <p>Start Date: {challenge.created_at}</p>
      <p>End: {challenge.end_time}</p>
      <button>Join</button>

      <Link to={"/challenges"}>
        <button>Back to Challenges</button>
      </Link>
    </>
  );
}

export default ChallengeInfo;
