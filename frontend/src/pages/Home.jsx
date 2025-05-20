import { allChallenges } from "../adapters/challengesFetch";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [someChallengesData, setSomeChallengesData] = useState([]);

  useEffect(() => {
    const someChallenges = async () => {
      try {
        const [data, error] = await allChallenges();

        if (error) {
          console.error("Error fetching some challenges:", error);
          return;
        }
        setSomeChallengesData(data);
      } catch (err) {
        console.error("Unexpected error");
      }
    };
    someChallenges();
  }, []);

  return (
    <>
      <div id="join">
        <h1>Get Inspired Today!</h1>
        <p>Join a platform for challenges and goals. Share with the world.</p>
        <Link to="/sign-up">
          {" "}
          <button id="join-btn">Join Here</button>
        </Link>
      </div>
      <div id="mission">
        <h2>The Mission Behind the Motion</h2>
        <p>
          Mindful Motion is a platform to maximize teenagers’ productivity and
          ultimately boost their ambition by creating a web app that allows for
          users to continue to get their dopamine rush obtained from scrolling
          on an app, but control the content being fed to them by only hosting
          projects and challenges to our users.
        </p>
      </div>
      <div id="home-challenges">
        <h2>Dare to Begin...</h2>
        <ul className="few-challenges">
          {someChallengesData.slice(0, 4).map((chall) => (
            <li
              key={chall.id}
              style={{
                padding: "1rem",
                minWidth: "150px",
                textAlign: "center",
              }}
            >
              <h3 className="challenge-title">
                <strong>{chall.title}</strong>
              </h3>
              <p>{chall.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
