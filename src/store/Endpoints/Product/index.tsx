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
  removeCartItem: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: "/cart-remove/",
    },
  },
  incrementDecrementCartItemAPI: {
    v1: {
      ...defaults.methods.PUT,
      ...defaults.versions.v1,
      uri: "/cart-item-in-de/",
    },
  },
  homeProducts: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/our-products/",
    },
  },
  journalBooks: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: "/products/",
    },
  },
  productCategoriesWise: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/category-wise-product/",
    },
  },
  productSizeApi: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: "/product-size/",
    },
  },
};
