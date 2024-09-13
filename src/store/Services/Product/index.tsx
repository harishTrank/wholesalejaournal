import { callApi } from "../../../Utils/api/apiUtils";
import { productEndpoints } from "../../Endpoints/Product";

export const addToCartDefault = ({ body }: any) =>
  callApi({
    uriEndPoint: productEndpoints.addToCartDefault.v1,
    body,
  });
