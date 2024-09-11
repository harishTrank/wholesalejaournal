import { defaults } from "../default";

export const authEndpoints = {
  mobileLogin: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/login/",
    },
  },
  registerUser: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/signup/",
    },
  },
  getUserDetails: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/user-profile/",
    },
  },
  logoutUser: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/logout/",
    },
  },
  updateUserDetail: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: "/user-update/",
    },
  },
  sendOtpEmail: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/send-otp/",
    },
  },
};
