import { callApi } from "../../../Utils/api/apiUtils";
import { authEndpoints } from "../../Endpoints/Auth";

export const loginApiCall = ({ body }: any) =>
  callApi({
    uriEndPoint: authEndpoints.mobileLogin.v1,
    body,
  });

export const productApiCall=({body}:any)=>
  callApi({
    uriEndPoint:authEndpoints.shopProducts.v1
  })  
