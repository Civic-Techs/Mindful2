import { NavLink } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import { Heading } from "@chakra-ui/react";

export default function SiteHeadingAndNav() {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <header>
      <Heading fontWeight={"bold"} size="4xl">
        <a id="logo" href="/">
          Mindful Motion
        </a>
      </Heading>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>

          {currentUser ? (
            <>
              <li>
                <NavLink to="/challenges" end={true}>
                  Challenges
                </NavLink>
              </li>
              <li>
                <NavLink to={`/users/${currentUser.id}`}>
                  {currentUser.username}
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                <NavLink to="/sign-up">Sign Up</NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
