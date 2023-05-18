import useToken from "../hooks/useToken";
import useUser from "../hooks/useUser";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { toast } from "react-toastify";
import { loginUser, checkUser } from "../requests";

const SignIn = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [loginValid, setLoginValid] = useState(true);

  const { setUser } = useUser();
  const { setToken, token } = useToken();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoginValid(true);

    const token = loginUser({
      username,
      password,
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
          setToken(response.data.token);
          setUser(response.data.user);
          navigate("/dashboard");
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
    }
  }, []);

  return (
    <div className="container">
      <div className="auth-form">
        <h5>Hi There!</h5>
        <p>Welcome to innews. Personal Dashboard</p>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">
            {loading ? <ReactSVG src="svg/loading-circle.svg" /> : "Submit"}
          </button>
        </form>
        <p>
          Don't have an account? <Link to="/sign-up">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
