import { useContext, useState } from "react";
import { useNavigate, Navigate, Link } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import { registerUser } from "../adapters/auth-adapter";

// Controlling the sign up form is a good idea because we want to add (eventually)
// more validation and provide real time feedback to the user about usernames and passwords
export default function SignUpPage() {
  const navigate = useNavigate();
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  const [errorText, setErrorText] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [dob, setDOB] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // users shouldn't be able to see the sign up page if they are already logged in.
  // if the currentUser exists in the context, navigate the user to
  // the /users/:id page for that user, using the currentUser.id value
  if (currentUser) return <Navigate to={`/users/${currentUser.id}`} />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorText("");
    if (!email || !name || !dob || !username || !password)
      return setErrorText("Missing username or password");

    const [user, error] = await registerUser({
      email,
      name,
      dob,
      username,
      password,
    });
    if (error) return setErrorText(error.message);

    setCurrentUser(user);
    navigate("/");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") setEmail(value);
    if (name === "name") setName(value);
    if (name === "dob") setDOB(value);
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
  };

  return (
    <>
      <form
        className="signup-form"
        onSubmit={handleSubmit}
        onChange={handleChange}
        aria-labelledby="create-heading"
      >
        <h2 id="create-heading">Create New User</h2>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          autoComplete="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="name">Name</label>
        <input
          type="text"
          autoComplete="name"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="dob">Date of birth</label>
        <input
          type="date"
          autoComplete="dob"
          id="dob"
          name="dob"
          value={dob}
          onChange={(e) => setDOB(e.target.value)}
        />

        <label htmlFor="username">Username</label>
        <input
          autoComplete="off"
          type="text"
          id="username"
          name="username"
          onChange={handleChange}
          value={username}
        />

        <label htmlFor="password">Password</label>
        <input
          autoComplete="off"
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          value={password}
        />

        {/* In reality, we'd want a LOT more validation on signup, so add more things if you have time
        <label htmlFor="password-confirm">Password Confirm</label>
        <input autoComplete="off" type="password" id="password-confirm" name="passwordConfirm" />
      */}

        <button>Sign Up Now!</button>
      </form>
      <div id="signup-redirect">
        {!!errorText && <p>{errorText}</p>}
        <p>
          Already have an account with us? <Link to="/login">Log in</Link>
        </p>
      </div>
    </>
  );
}
