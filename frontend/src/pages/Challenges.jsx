import { allChallenges } from "../adapters/challengesFetch";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import CreateChallenge from "@/components/CreateChallenge";

const colors = [
  "#FF6B6B", // red
  "#6BCB77", // green
  "#4D96FF", // blue
  "#FFC75F", // yellow
  "#FF9671", // orange
  "#A66DD4", // purple
  "#00C9A7", // teal
];

function ChallengesPage() {
  const [allChallengesData, setAllChallengesData] = useState([]);

  useEffect(() => {
    const getChallenges = async () => {
      try {
        const [data, error] = await allChallenges();
        console.log("challenge data:", data);
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

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "16px",
          maxWidth: "600px",
          margin: "20px auto",
        }}
      >
        {allChallengesData.map((challenge, index) => {
          const colorIndex = challenge.id % colors.length;
          const randomColor = colors[colorIndex];
          return (
            <Link
              to={`/challenges/${challenge.id}`}
              key={challenge.id}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div
                style={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    backgroundColor: randomColor,
                    height: "100px",
                  }}
                />

                <div
                  style={{
                    padding: "12px",
                    textAlign: "center",
                    backgroundColor: "white",
                    fontWeight: "500",
                  }}
                >
                  {challenge.title}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <Link to="/create-challenge">
        <button id="create-btn-container">Create Challenge!</button>
      </Link>
    </>
  );
}

export default ChallengesPage;
