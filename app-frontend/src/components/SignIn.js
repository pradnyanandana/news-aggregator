import { Link } from 'react-router-dom';

const SignIn = () => {
  return (
    <div className="container">
      <div className="auth-form">
        <h3>Hi There!</h3>
        <p>Welcome to innews. Personal Dashboard</p>
        <form>
          <input
            type="text"
            className="username"
            placeholder="Username"
          ></input>
          <input
            type="password"
            className="password"
            placeholder="Password"
          ></input>
          <button type="submit">Submit</button>
        </form>
        <p>Don't have an account? <Link to="/sign-up">Sign up</Link></p>
      </div>
    </div>
  );
};

export default SignIn;
