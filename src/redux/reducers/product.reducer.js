import * as types from "../constants/product.constants";

const initialState = {
  products: [],
  totalPageNum: 1,
  selectedProduct: {},
  loading: false,
};

const productReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.PRODUCT_REQUEST:
    case types.GET_SINGLE_PRODUCT_REQUEST:
    case types.CREATE_PRODUCT_REQUEST:
    case types.UPDATE_PRODUCT_REQUEST:
    case types.DELETE_PRODUCT_REQUEST:
      return { ...state, loading: true };

    case types.PRODUCT_REQUEST_SUCCESS:
      return {
        ...state,
        products: payload.products,
        totalPageNum: payload.totalPages,
        loading: false,
      };

    case types.GET_SINGLE_PRODUCT_REQUEST_SUCCESS:
      return { ...state, selectedProduct: payload, loading: false };

    case types.UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        selectedProduct: payload,
        loading: false,
        redirectTo: "__GO_BACK__",
      };

    case types.CREATE_PRODUCT_SUCCESS:
      return { ...state, loading: false, redirectTo: "__GO_BACK__" };

    case types.DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedProduct: {},
        redirectTo: "__GO_BACK__",
      };

    case types.PRODUCT_REQUEST_FAILURE:
    case types.GET_SINGLE_PRODUCT_REQUEST_FAILURE:
    case types.CREATE_PRODUCT_FAILURE:
    case types.UPDATE_PRODUCT_FAILURE:
    case types.DELETE_PRODUCT_FAILURE:
      console.log(payload);
      return { ...state, loading: false };
    case types.SET_REDIRECT_TO:
      return { ...state, redirectTo: payload };
    default:
      return state;
  }
};

export default productReducer;
