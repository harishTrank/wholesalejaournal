import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Header from "../../components/Header";
import { CgProfile } from "react-icons/cg";
import Accountimage from "../../images/10973590.jpg";
import Footer from "../../components/Footer";
import "./style.css";
import LoginScreen from "../Login";
import Signup from "../Signup";
import FullScreenLoader from "../../components/FullScreenLoader";
import { GetUserDetailsApi } from "../../hooks/Auth/query";
import { useNavigate } from "react-router-dom";
import { logoutUser, updateUserDetail } from "../../store/Services/Auth";
import toast from "react-hot-toast";
import ForgotPassword from "../ForgotPassword";

// Define the validation schema using Yup
const ProfileSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  currentPassword: Yup.string().min(
    8,
    "Password must be at least 8 characters"
  ),
  newPassword: Yup.string().min(8, "Password must be at least 8 characters"),
});

const MyAccount = () => {
  const navigation: any = useNavigate();
  const [isLoginShow, setIsLoginShow] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { data }: any = GetUserDetailsApi();
  const [isForgetScreen, setIsForgetScreen]: any = useState(false);

  const onSubmitHandler = (values: any, { resetForm }: any) => {
    setIsLoading(true);
    updateUserDetail({
      body: {
        first_name: values.firstName,
        last_name: values.lastName,
        current_password:
          values.currentPassword === "" ? undefined : values.currentPassword,
        new_password:
          values.newPassword === "" ? undefined : values.newPassword,
      },
    })
      .then(() => {
        toast.success("Update user successfully.");
        resetForm();
      })
      .catch((err) => {
        toast.error(err.data.message);
        resetForm();
      })
      .finally(() => {
        setIsLoading(false);
        resetForm();
      });
  };

  const logoutButtonHandler = () => {
    logoutUser()
      .then((res: any) => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userId");
        navigation("/");
        toast.success("Logout user successfully.");
      })
      .catch((err: any) => toast.error("Something went wrong."));
  };
  return (
    <div>
      <Header />
      {isLoading && <FullScreenLoader />}
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
          {localStorage.getItem("accessToken") ? (
            <Formik
              enableReinitialize={true}
              initialValues={{
                email: data?.data?.email || "",
                firstName: data?.data?.first_name || "",
                lastName: data?.data?.last_name || "",
                currentPassword: "",
                newPassword: "",
              }}
              validationSchema={ProfileSchema}
              onSubmit={onSubmitHandler}
            >
              {({ isSubmitting }) => (
                <Form className="flex al-center contact-part">
                  <div className="email-section">
                    <div className="email-content">
                      <div className="email flex space-bw">
                        <label>Email</label>
                        <Field
                          type="email"
                          name="email"
                          placeholder="Enter your email address"
                          disabled={true} // Disable the email field
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="error-message"
                        />
                      </div>
                      <div className="email flex space-bw">
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
                      <div className="email flex space-bw">
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
                      <div className="email flex space-bw">
                        <label>Current Password</label>
                        <Field
                          type="password"
                          name="currentPassword"
                          placeholder="Enter your current password"
                        />
                        <ErrorMessage
                          name="currentPassword"
                          component="div"
                          className="error-message"
                        />
                      </div>
                      <div className="email flex space-bw">
                        <label>New Password</label>
                        <Field
                          type="password"
                          name="newPassword"
                          placeholder="Enter your new password"
                        />
                        <ErrorMessage
                          name="newPassword"
                          component="div"
                          className="error-message"
                        />
                      </div>
                      <div className="update-btn text-center flex space-bw">
                        <button type="submit" disabled={isSubmitting}>
                          Update
                        </button>
                        <button onClick={logoutButtonHandler} type="button">
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="profile-img">
                    <img src={Accountimage} alt="Profile" />
                  </div>
                </Form>
              )}
            </Formik>
          ) : isForgetScreen ? (
            <ForgotPassword
              setIsLoading={setIsLoading}
              setIsLoginShow={setIsLoginShow}
              setIsForgetScreen={setIsForgetScreen}
            />
          ) : isLoginShow ? (
            <LoginScreen
              setIsLoginShow={setIsLoginShow}
              setIsLoading={setIsLoading}
              setIsForgetScreen={setIsForgetScreen}
            />
          ) : (
            <Signup
              setIsLoginShow={setIsLoginShow}
              setIsLoading={setIsLoading}
            />
          )}
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default MyAccount;
