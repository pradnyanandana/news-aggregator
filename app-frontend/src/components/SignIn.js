import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { toast } from "react-toastify";
import { loginUser, checkUser } from "../requests";
import { useSelector, useDispatch } from "react-redux";
import { saveToken, saveUser } from "../app/store";

const SignIn = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const token = useSelector((state) => state.token.value);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    loginUser({
      username,
      password,
    })
      .then((response) => {
        if (
          response !== undefined &&
          typeof response.data === "object" &&
          !Array.isArray(response.data) &&
          response.data !== null
        ) {
          console.log(response.data);
          toast.success(response.data.message);
          dispatch(saveToken(response.data.token));
          dispatch(saveUser(response.data.user))
          navigate("/dashboard");
        }

        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.response.data?.message);
        setLoading(false);
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
        .catch(() => {});
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
            {loading ? <ReactSVG src="svg/loading-circle.svg" /> : "Sign In"}
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
