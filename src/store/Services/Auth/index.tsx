import { callApi } from "../../../Utils/api/apiUtils";
import { authEndpoints } from "../../Endpoints/Auth";

export const loginApiCall = ({ body }: any) =>
  callApi({
    uriEndPoint: authEndpoints.mobileLogin.v1,
    body,
  });

export const registerUser = ({ body }: any) =>
  callApi({
    uriEndPoint: authEndpoints.registerUser.v1,
    body,
  });

export const getUserDetails = () =>
  callApi({
    uriEndPoint: authEndpoints.getUserDetails.v1,
  });

export const logoutUser = () =>
  callApi({
    uriEndPoint: authEndpoints.logoutUser.v1,
  });

export const updateUserDetail = ({ body }: any) =>
  callApi({
    uriEndPoint: authEndpoints.updateUserDetail.v1,
    body,
  });
