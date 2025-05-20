import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { getUser } from "../adapters/user-adapter";
import { logUserOut } from "../adapters/auth-adapter";
import UpdateUsernameForm from "../components/UpdateUsernameForm";
import { getChallengeTitlesByUserId } from "../adapters/participants-adapter";

export default function UserPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [userProfile, setUserProfile] = useState(null);
  const [challengeTitles, setChallengeTitles] = useState();
  const { id } = useParams();
  const [showForm, setShowForm] = useState(false);

  const isCurrentUserProfile = currentUser && currentUser.id === Number(id);

  useEffect(() => {
    const loadUser = async () => {
      const [user, error] = await getUser(id);
      if (error) return setError(error);
      setUserProfile(user);

      const data = await getChallengeTitlesByUserId(id);
      // console.log(data);

      setChallengeTitles(data);
    };
    loadUser();
  }, [id]);

  const handleLogout = async () => {
    logUserOut();
    setCurrentUser(null);
    navigate("/");
  };

  if (!userProfile) return null;

  // // When we update the username, the userProfile state won't change but the currentUser state will.
  const profileUsername = isCurrentUserProfile
    ? currentUser.username
    : userProfile.username;

  const profileBio = isCurrentUserProfile ? currentUser.bio : userProfile.bio;
  return (
    <>
      <div className="userHeader">
        <div className="leftPanel">
          <h1 id="userFace">{profileUsername}</h1>

          {isCurrentUserProfile ? (
            <>
              <button id="logout-btn" onClick={handleLogout}>
                Logout
              </button>
              <button id="update-btn" onClick={() => setShowForm(!showForm)}>
                {showForm ? "Cancel Edit" : "Update Profile"}
              </button>
              {showForm && (
                <UpdateUsernameForm
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              )}
            </>
          ) : (
            ""
          )}
        </div>

        <div className="rightPanel" id="userInfo">
          <p>
            <strong>Birthday:</strong> {userProfile.dob || "Not provided yet"}
          </p>
          <p>
            <strong>Bio:</strong> {profileBio || "No bio yet!"}
          </p>
          <h3>Challenges Joined</h3>
          <ul>
            {challengeTitles
              ? challengeTitles.map((chall, index) => (
                  <li key={chall.challenge_id ?? index}>
                    <p>{chall.title}</p>
                  </li>
                ))
              : "No challenges joined :("}
          </ul>
        </div>
      </div>
    </>
  );
}
