import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CurrentUserContext from '../contexts/current-user-context';
import { getUser } from '../adapters/user-adapter';
import { logUserOut } from '../adapters/auth-adapter';
import UpdateUsernameForm from '../components/UpdateUsernameForm';
import { getChallengeTitlesByUserId } from '../adapters/participants-adapter';
// import { getChallengeById } from '../../../server/controllers/challController';
import {
  basicFetchOptions,
  getPatchOptions,
  getPostOptions,
} from '../utils/fetchingUtils';

export default function UserPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [userProfile, setUserProfile] = useState(null);
  // const [error, setError] = useState(null);
  const [challengeTitles, setChallengeTitles] = useState();
  // const [challengeTitleError, setChallengeTitleError] = useState(null);
  const { id } = useParams();
  const isCurrentUserProfile = currentUser && currentUser.id === Number(id);

  useEffect(() => {
    const loadUser = async () => {
      const [user, error] = await getUser(id);
      if (error) return setError(error);
      setUserProfile(user);

      const data = await getChallengeTitlesByUserId(id);
      console.log(data);

      setChallengeTitles(data);
      // console.log(challengeTitles);
      // if (error) return setChallengeTitleError(error);
      // setChallengeTitles(challengeTitles);
    };
    loadUser();
  }, [id]);

  const handleLogout = async () => {
    logUserOut();
    setCurrentUser(null);
    navigate('/');
  };

  // if (error)
  //   return (
  //     <p>Sorry, there was a problem loading user. Please try again later.</p>
  //   );

  if (!userProfile) return null;

  // // When we update the username, the userProfile state won't change but the currentUser state will.
  const profileUsername = isCurrentUserProfile
    ? currentUser.username
    : userProfile.username;
  console.log(challengeTitles);
  return (
    <>
      <h1>{profileUsername}</h1>
      <p>Birthday: {userProfile.dob || 'Not provided yet'}</p>
      <p>Bio: {userProfile.bio || 'No bio yet!'}</p>
      <h4>Challenges Joined</h4>
      <ul>
        {challengeTitles
          ? challengeTitles.map((chall) => (
              <li key={chall.id}>
                <p>{chall.title}</p>
              </li>
            ))
          : 'No challenges joined :('}
      </ul>
      {isCurrentUserProfile ? (
        <>
          <UpdateUsernameForm
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
          <button onClick={handleLogout}>Log Out</button>
        </>
      ) : (
        ''
      )}
    </>
  );
}
