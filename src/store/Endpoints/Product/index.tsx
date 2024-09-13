import { defaults } from "../default";

export const productEndpoints = {
  addToCartDefault: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/add-to-cart/",
    },
  },
  currentCartListAPI: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/get-user-cart/",
    },
  },
};
