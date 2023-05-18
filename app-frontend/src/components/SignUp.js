import { useEffect, useState } from "react";
import { checkUser, registerUser } from "../requests";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ReactSVG } from "react-svg";
import { useSelector } from "react-redux";

const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [repassword, setRePassword] = useState();
  const [loading, setLoading] = useState(false);

  const token = useSelector((state) => state.token.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    registerUser({
      name,
      username,
      password,
      repassword,
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
          navigate("/sign-in");
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
          <button type="submit">
            {loading ? <ReactSVG src="svg/loading-circle.svg" /> : "Register"}
          </button>
        </form>
        <p>
          Already have an account? <Link to="/sign-in">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
