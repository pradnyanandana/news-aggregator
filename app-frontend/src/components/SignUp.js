import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div className="container">
      <div className="auth-form">
        <h3>Create Your Account</h3>
        <p>Let's get started to personalized your news feed</p>
        <form>
          <input type="text" className="name" placeholder="Name"></input>
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
          <input
            type="password"
            className="retype-password"
            placeholder="Retype Password"
          ></input>
          <button type="submit">Register</button>
        </form>
        <p>Already have an account? <Link to="/sign-in">Sign in</Link></p>
      </div>
    </div>
  );
};

export default SignUp;
