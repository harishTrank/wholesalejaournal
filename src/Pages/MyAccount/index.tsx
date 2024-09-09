import React from "react";
import Header from "../../components/Header";
import { CgProfile } from "react-icons/cg";
import Accountimage from "../../images/10973590.jpg";
import Footer from "../../components/Footer";
import LoginImage from "../../images/Login.jpg";
import "./style.css";
import { Link } from "react-router-dom";
const index = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <section className="gap">
          <div className="my-profile">
            <h1 className="flex">
              <CgProfile size={45} />
              &nbsp;My Profile
            </h1>
            <p>
              Your profile is a record of your personal information
              <br />
              that defines who you are
            </p>
          </div>
          {sessionStorage.getItem("accessToken") ? (
            <div className="flex al-center contact-part">
              <div className="email-section">
                <div className="email-content">
                  <div className="email flex space-bw">
                    <label htmlFor="">
                      <p>Email</p>
                    </label>
                    <input type="text" placeholder="Enter your email address" />
                  </div>
                  <div className="email flex space-bw">
                    <label htmlFor="">
                      <p>First Name</p>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your first part of your name"
                    />
                  </div>
                  <div className="email flex space-bw">
                    <label htmlFor="">
                      <p>Last Name</p>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your last part of your name"
                    />
                  </div>
                  <div className="email flex space-bw">
                    <label htmlFor="">
                      <p>Current Password</p>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your current password here"
                    />
                  </div>
                  <div className="email flex space-bw">
                    <label htmlFor="">
                      <p>New Password</p>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your new pssword here"
                    />
                  </div>
                  <div className="update-btn text-center">
                    <button>Update</button>
                  </div>
                </div>
              </div>
              <div className="profile-img">
                <img src={Accountimage} alt="" />
              </div>
            </div>
          ) : (
            <div className="login-card">
              <div className="login-card-left">
                <img src={LoginImage} alt="Login Illustration" />
              </div>
              <div className="login-card-right">
                <h1>Login</h1>
                <form>
                  <div className="input-group">
                    <label>Email</label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label>Password</label>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      required
                    />
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
          )}
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default index;
