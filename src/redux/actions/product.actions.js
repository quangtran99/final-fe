import * as types from "../constants/product.constants";
import api from "../api";

const productsRequest = () => async (dispatch) => {
  dispatch({ type: types.PRODUCT_REQUEST, payload: null });
  try {
    const res = await api.get("/products");
    dispatch({ type: types.PRODUCT_REQUEST_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.PRODUCT_REQUEST_FAILURE, payload: error });
  }
};

export const productActions = {
  productsRequest,
};