import useToken from "../hooks/useToken";
import { useEffect, useState } from "react";
import { checkUser, registerUser } from "../requests";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [repassword, setRePassword] = useState();
  const [loading, setLoading] = useState(false);
  const [loginValid, setLoginValid] = useState(true);

  const { token } = useToken();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginValid(true);

    const token = registerUser({
      name,
      username,
      password,
      repassword,
    });

    token
      .then((response) => {
        if (
          response !== undefined &&
          typeof response.data === "object" &&
          !Array.isArray(response.data) &&
          response.data !== null
        ) {
          console.log(response.data);
          toast(response.data.message);
          navigate("/sign-in");
        }

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast(error.response.data?.message);
        setLoading(false);
        setLoginValid(false);
      });
  };

  useEffect(() => {
    if (token) {
      checkUser({ token })
        .then((response) => {
          if (
            response !== undefined &&
            typeof response.data === "object" &&
            !Array.isArray(response.data) &&
            response.data !== null
          ) {
            navigate("/dashboard");
          }
        })
        .catch((error) => {});
    }
  }, []);

  return (
    <div className="container">
      <div className="auth-form">
        <h5>Create Your Account</h5>
        <p>Let's get started to personalized your news feed</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="name"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          ></input>
          <input
            type="text"
            className="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <input
            type="password"
            className="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <input
            type="password"
            className="retype-password"
            placeholder="Retype Password"
            onChange={(e) => setRePassword(e.target.value)}
          ></input>
          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? <Link to="/sign-in">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
