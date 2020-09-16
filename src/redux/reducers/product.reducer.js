import * as types from "../constants/product.constants";

const initialState = {
  products: [],
  loading: false,
};

const productReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.PRODUCT_REQUEST:
      return { ...state, loading: true };
    case types.PRODUCT_REQUEST_SUCCESS:
      return { ...state, products: payload, loading: false };
    case types.PRODUCT_REQUEST_FAILURE:
      console.log(payload);
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default productReducer;