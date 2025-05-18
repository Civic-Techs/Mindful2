import { allChallenges } from "../adapters/challengesFetch";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ChallengesPage() {
  const [allChallengesData, setAllChallengesData] = useState([]);

  useEffect(() => {
    const getChallenges = async () => {
      try {
        const [data, error] = await allChallenges();

        if (error) {
          console.error("Error fetching challenges:", error);
          return;
        }
        setAllChallengesData(data);
      } catch (err) {
        console.error("Unexpected error at challenges");
      }
    };
    getChallenges();
  }, []);
  return (
    <>
      <h2>Choose a Challenge and Get Started!</h2>
      <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
        {allChallengesData.map((challenge) => (
          <li key={challenge.id}>
            <Link to={`/challenges/${challenge.id}`}>{challenge.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ChallengesPage;
