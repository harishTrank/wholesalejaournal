import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import SignupImage from "../../images/Signup.jpg";
import "./style.css";
import { registerUser } from "../../store/Services/Auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Define the validation schema using Yup
const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

const Signup = ({ setIsLoginShow }: any) => {
  const navigation: any = useNavigate();
  const onSubmitHandler = async (
    values: any,
    { setSubmitting, resetForm }: any
  ) => {
    try {
      const res: any = await registerUser({
        body: {
          email: values.email,
          password: values.password,
          first_name: values.firstName,
          last_name: values.lastName,
        },
      });
      console.log("res", res);
      localStorage.setItem("accessToken", res.token.access);
      localStorage.setItem("userId", res.userid);
      toast.success("User created successfully.");
      resetForm();
      navigation("/");
    } catch (err: any) {
      toast.error(err.data.responsemessage);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="login-card">
      <div className="login-card-left">
        <img src={SignupImage} alt="Login Illustration" />
      </div>
      <div className="login-card-right">
        <h1>Signup</h1>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={onSubmitHandler}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="input-group">
                <label>First Name</label>
                <Field
                  type="text"
                  name="firstName"
                  placeholder="Enter your first name"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="input-group">
                <label>Last Name</label>
                <Field
                  type="text"
                  name="lastName"
                  placeholder="Enter your last name"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="input-group">
                <label>Email</label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="input-group">
                <label>Password</label>
                <Field
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-message"
                />
              </div>
              <div className="input-group">
                <label>Confirm Password</label>
                <Field
                  type="password"
                  name="confirmPassword"
                  placeholder="Enter your password again"
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="error-message"
                />
              </div>
              <button type="submit" disabled={isSubmitting}>
                Signup
              </button>
              <p>
                Already have an account?{" "}
                <u onClick={() => setIsLoginShow(true)}>Login</u>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Signup;
