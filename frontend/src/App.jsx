// import { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUpPage from "./pages/SignUp";
import LoginPage from "./pages/Login";
import SiteHeadingAndNav from "./components/SiteHeadingAndNav";
import NotFoundPage from "./pages/NotFound";
import UserPage from "./pages/User";
import ChallengesPage from "./pages/Challenges";
import ChallengeInfo from "./components/ChallengeDetails";
import "../src/styles/App.css";

export default function App() {
  // const { setCurrentUser } = useContext(UserContext);
  // useEffect(() => {
  //   const loadCurrentUser = async () => {
  //     // we aren't concerned about an error happening here
  //     const [data] = await checkForLoggedInUser();
  //     if (data) setCurrentUser(data);
  //   };
  //   loadCurrentUser();
  // }, [setCurrentUser]); ---> this was causing an error for some reason??

  return (
    <>
      <SiteHeadingAndNav />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/challenges" element={<ChallengesPage />} />
          <Route path="/challenges/:id" element={<ChallengeInfo />} />
          <Route path="/users/:id" element={<UserPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}
