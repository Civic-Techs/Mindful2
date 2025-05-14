import { Link } from "react-router-dom";
//import mockData from '../mockData.json';

function UserProfile() {
  // const user = mockData.user;
  // const hasJoined = mockData.challenges.filter(
  //   (entry) => entry.userId === user.userId
  // );
  // const challengeIds = hasJoined.map((entry) => entry.challengeId);
  // const userChallengeInfo = challenges.filter((challenge) =>
  //   challengeIds.includes(challenge.challengeId)
  // );
  // return (
  //   <>
  //     <h2>{user.name}</h2>
  //     <p>Birthday: {user.dob}</p>
  //     <p>Created: {user.created_at}</p>
  //     <Link to="/">
  //       <button>Go Home</button>
  //     </Link>
  //     <p>{user.bio}</p>
  //     <h3>Joined Challenges</h3>
  //     {userChallengeInfo.length > 0 ? (
  //       <ul>
  //         {userChallengeInfo.map((challenge) => (
  //           <li key={challenge.challengeId}>{challenge.title}</li>
  //         ))}
  //       </ul>
  //     ) : (
  //       <p>{user.name} has not joined any challenges.</p>
  //     )}
  //   </>
  // );
  //
  // Hey! not sure if this is needed since there is a User.jsx --> Ajene
  return (
    <>
      <img
        src="nosrc"
        title="pfp placeholder"
        alt="hover over (broken)image :]"
      />
      <div style={{ border: "2px solid red" }}>
        <p>win count</p>
        <div style={{ border: "2px solid black" }}>
          <p>bio and socials</p>
        </div>
      </div>

      <div style={{ border: "2px solid black" }}>
        users joined challenges here?
      </div>
    </>
  );
}

export default UserProfile;
