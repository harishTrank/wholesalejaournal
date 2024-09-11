import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import forgot from "../../images/forgot.jpg";
import "./style.css";
const ForgotPassword = () => {
  const [enterOtp, setEnterOtp] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Please enter email"),

      newPassword: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Enter new password"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), ""], "Passwords must match")
        .required("Enter confirm password"),
    }),
    onSubmit: (values) => {
      // Handle form submission
      console.log(values);
    },
  });

  const handleSendOtp = () => {
    if (formik.values.email && formik.errors.email === undefined) {
      setEnterOtp(true);
    } else {
      formik.setTouched({
        email: true,
      });
    }
  };

  return (
    <div className="login-card">
      <div className="login-card-left">
        <img src={forgot} alt="Login Illustration" />
      </div>
      <div className="login-card-right">
        <h1>Forgot Password?</h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="error red">{formik.errors.email}</div>
            ) : null}
          </div>
          <div className="otp-send">
            <button type="button" onClick={handleSendOtp}>
              Send OTP to Email Address
            </button>
          </div>
          {enterOtp && (
            <>
              <div className="input-group">
                <label>Enter OTP</label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  placeholder="Enter OTP"
                  value={formik.values.otp}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.otp && formik.errors.otp ? (
                  <div className="error red">{formik.errors.otp}</div>
                ) : null}
              </div>
              <div className="input-group">
                <label>New Password</label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  placeholder="Enter your new password"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.newPassword && formik.errors.newPassword ? (
                  <div className="error red">{formik.errors.newPassword}</div>
                ) : null}
              </div>
              <div className="input-group">
                <label>Confirm New Password</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm your new password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.confirmPassword &&
                formik.errors.confirmPassword ? (
                  <div className="error red">
                    {formik.errors.confirmPassword}
                  </div>
                ) : null}
              </div>
              <button type="submit">Change Password</button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;