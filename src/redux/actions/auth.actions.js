import * as types from "../constants/auth.constants";
import api from "../api";
import { alertActions } from "./alert.actions";

const loginRequest = (email, password) => async (dispatch) => {
  dispatch({ type: types.LOGIN_REQUEST, payload: null });
  try {
    const res = await api.post("/auth/login", { email, password });
    dispatch({ type: types.LOGIN_SUCCESS, payload: res.data.data });
    api.defaults.headers.common["authorization"] =
      "Bearer " + res.data.data.accessToken;
    const name = res.data.data.user.name;
    dispatch(alertActions.setAlert(`Welcome back, ${name}`, "success"));
  } catch (error) {
    dispatch({ type: types.LOGIN_FAILURE, payload: error });
  }
};

const loginFacebookRequest = (access_token) => async (dispatch) => {
  dispatch({ type: types.LOGIN_FACEBOOK_REQUEST, payload: null });
  try {
    const res = await api.post("/auth/login/facebook", { access_token });
    const name = res.data.data.user.name;
    dispatch(alertActions.setAlert(`Welcome ${name}`, "success"));
    dispatch({ type: types.LOGIN_FACEBOOK_SUCCESS, payload: res.data.data });
    api.defaults.headers.common["authorization"] =
      "Bearer " + res.data.data.accessToken;
  } catch (error) {
    dispatch({ type: types.LOGIN_FACEBOOK_FAILURE, payload: error });
  }
};

const loginGoogleRequest = (access_token) => async (dispatch) => {
  dispatch({ type: types.LOGIN_GOOGLE_REQUEST, payload: null });
  try {
    const res = await api.post("/auth/login/google", { access_token });
    const name = res.data.data.user.name;
    dispatch(alertActions.setAlert(`Welcome ${name}`, "success"));
    dispatch({ type: types.LOGIN_GOOGLE_SUCCESS, payload: res.data.data });
    api.defaults.headers.common["authorization"] =
      "Bearer " + res.data.data.accessToken;
  } catch (error) {
    dispatch({ type: types.LOGIN_GOOGLE_FAILURE, payload: error });
  }
};

const updateProfile = (name, avatarUrl) => async (dispatch) => {
  dispatch({ type: types.UPDATE_PROFILE_REQUEST, payload: null });
  try {
    const res = await api.put("/users", { name, avatarUrl });
    dispatch({ type: types.UPDATE_PROFILE_SUCCESS, payload: res.data.data });
    dispatch(
      alertActions.setAlert(`Your profile has been updated.`, "success")
    );
  } catch (error) {
    dispatch({ type: types.UPDATE_PROFILE_FAILURE, payload: error });
  }
};

const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: types.REGISTER_REQUEST, payload: null });
  try {
    const res = await api.post("/users", { name, email, password });
    dispatch({ type: types.REGISTER_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.REGISTER_FAILURE, payload: error });
  }
};

const getCurrentUser = (accessToken) => async (dispatch) => {
  dispatch({ type: types.GET_CURRENT_USER_REQUEST, payload: null });
  if (accessToken) {
    const bearerToken = "Bearer " + accessToken;
    api.defaults.headers.common["authorization"] = bearerToken;
  }
  try {
    const res = await api.get("/users/me");
    dispatch({ type: types.GET_CURRENT_USER_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.GET_CURRENT_USER_FAILURE, payload: error });
  }
};

const logout = () => (dispatch) => {
  delete api.defaults.headers.common["authorization"];
  localStorage.setItem("accessToken", "");
  dispatch({ type: types.LOGOUT, payload: null });
};

const setRedirectTo = (redirectTo) => ({
  type: types.SET_REDIRECT_TO,
  payload: redirectTo,
});

const addProductToCart = (productID) => async (dispatch) => {
  dispatch({ type: types.ADD_PRODUCT_TO_CART_REQUEST, payload: null });
  try {
    const res = await api.post(`/users/cart`, { productID, quantity: 1 });
    dispatch({
      type: types.ADD_PRODUCT_TO_CART_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.ADD_PRODUCT_TO_CART_FAILURE, payload: error });
  }
};

const removeProductFromCart = (productID) => async (dispatch) => {
  dispatch({ type: types.REMOVE_PRODUCT_TO_CART_REQUEST, payload: null });
  try {
    await api.delete(`/users/cart/${productID}`);
    dispatch({
      type: types.REMOVE_PRODUCT_TO_CART_SUCCESS,
      payload: productID,
    });
  } catch (error) {
    dispatch({ type: types.REMOVE_PRODUCT_TO_CART_FAILURE, payload: error });
  }
};

const adjustProductQuantity = (productID, newQuantity) => (dispatch) => {
  dispatch({
    type: types.ADJUST_PRODUCT_QUANTITY,
    payload: { productID, newQuantity },
  });
};

const clearCart = () => (dispatch) => {
  dispatch({
    type: types.CLEAR_CART_SUCCESS,
    payload: [],
  });
};

const updateCartQuantity = (cart) => async (dispatch) => {
  dispatch({ type: types.UPDATE_CART_QUANTITY_REQUEST, payload: null });
  console.log("check", cart);
  try {
    const res = await api.post(`/users/update-quantity`, cart);
    console.log("abc", res);
    dispatch({
      type: types.UPDATE_CART_QUANTITY_SUCCESS,
      payload: null,
    });
  } catch (error) {
    console.log(error);
    dispatch({ type: types.UPDATE_CART_QUANTITY_FAILURE, payload: error });
  }
};

const verifyEmail = (code) => async (dispatch) => {
  dispatch({ type: types.VERIFY_EMAIL_REQUEST, payload: null });
  try {
    const res = await api.post("/users/verify_email", { code });
    dispatch({ type: types.VERIFY_EMAIL_SUCCESS, payload: res.data.data });
    const name = res.data.data.user.name;
    dispatch(
      alertActions.setAlert(
        `Welcome, ${name}! Your email address has been verified.`,
        "success"
      )
    );
    api.defaults.headers.common["authorization"] =
      "Bearer " + res.data.data.accessToken;
  } catch (error) {
    dispatch({ type: types.VERIFY_EMAIL_FAILURE, payload: error });
  }
};

export const authActions = {
  loginRequest,
  register,
  getCurrentUser,
  logout,
  setRedirectTo,
  loginFacebookRequest,
  loginGoogleRequest,
  addProductToCart,
  removeProductFromCart,
  adjustProductQuantity,
  updateCartQuantity,
  updateProfile,
  verifyEmail,
  clearCart,
};
