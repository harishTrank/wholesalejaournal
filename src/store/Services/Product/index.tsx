import { callApi } from "../../../Utils/api/apiUtils";
import { productEndpoints } from "../../Endpoints/Product";

export const addToCartDefault = ({ body }: any) =>
  callApi({
    uriEndPoint: productEndpoints.addToCartDefault.v1,
    body,
  });
export const currentCartListAPI = () =>
  callApi({
    uriEndPoint: productEndpoints.currentCartListAPI.v1,
  });

export const removeCartItem = ({ body }: any) =>
  callApi({
    uriEndPoint: productEndpoints.removeCartItem.v1,
    body,
  });

export const incrementDecrementCartItemAPI = ({ body }: any) =>
  callApi({
    uriEndPoint: productEndpoints.incrementDecrementCartItemAPI.v1,
    body,
  });

export const homeProducts = () =>
  callApi({
    uriEndPoint: productEndpoints.homeProducts.v1,
  });

export const journalBooksProducts = ({ body, query }: any) =>
  callApi({
    uriEndPoint: productEndpoints.journalBooks.v1,
    body,
    query,
  });

export const productCategoriesWise = ({ query }: any) =>
  callApi({
    uriEndPoint: productEndpoints.productCategoriesWise.v1,
    query,
  });

export const productSizeApi = ({ query }: any) =>
  callApi({
    uriEndPoint: productEndpoints.productSizeApi.v1,
    query,
  });

export const cartTotal=()=>
  callApi({
    uriEndPoint:productEndpoints.cartTotal.v1
  })

export const DiscountList=()=>
  callApi({
    uriEndPoint:productEndpoints.DiscountList.v1
  })  

export const CouponList=()=>
  callApi({
    uriEndPoint:productEndpoints.CouponList.v1
  }) 

export const ApplyCoupon=({ body }:any)=>
  callApi({
    uriEndPoint:productEndpoints.ApplyCoupon.v1,
    body
  })