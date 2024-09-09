import React from "react";
import "./style.css";
import LoginImage from "../../images/Login.jpg";
import { Link } from "react-router-dom";

const LoginScreen = () => {
  return (
    <div className="login-card">
      <div className="login-card-left">
        <img src={LoginImage} alt="Login Illustration" />
      </div>
      <div className="login-card-right">
        <h1>Login</h1>
        <form>
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Enter your password" required />
          </div>
          <button type="submit">Login</button>
          <p>
            Don't have an account?{" "}
            <Link to="/signup">
              <u>Signup</u>{" "}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
