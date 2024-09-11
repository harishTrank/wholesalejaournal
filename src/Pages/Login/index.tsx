import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./style.css";
import LoginImage from "../../images/Login.jpg";
import { useNavigate } from "react-router-dom";
import { loginApiCall } from "../../store/Services/Auth";
import toast from "react-hot-toast";

const LoginScreen = ({
  setIsLoginShow,
  setIsLoading,
  setIsForgetScreen,
}: any) => {
  const navigation: any = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      setIsLoading(true);
      loginApiCall({
        body: {
          email: values.email,
          password: values.password,
          user_type: "Client",
        },
      })
        .then((res: any) => {
          localStorage.setItem("accessToken", res.token.access);
          localStorage.setItem("userId", res.userid);
          toast.success("Login successfully.");
          navigation("/");
          setIsLoading(false);
        })
        .catch((err: any) => {
          toast.error("Unauthorized");
          setIsLoading(false);
        });
    },
  });

  return (
    <div className="login-card">
      <div className="login-card-left">
        <img src={LoginImage} alt="Login Illustration" />
      </div>
      <div className="login-card-right">
        <h1>Login</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="Enter your email"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error-message">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              placeholder="Enter your password"
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="error-message">{formik.errors.password}</div>
            ) : null}
          </div>

          <button type="submit">Login</button>

          <p>
            Don't have an account?{" "}
            <u onClick={() => setIsLoginShow(false)}>Signup</u>
          </p>
          <p onClick={() => setIsForgetScreen(true)}>
            <u>Forgot Password?</u>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
