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

const loginRequestFacebook = (token) => async (dispatch) => {
    dispatch({ type: types.LOGIN_REQUEST_FACEBOOK, payload: null})
  
    try{
      let response = await api.get(`/auth/login/facebook/${token}`)
      dispatch({type: types.LOGIN_REQUEST_FACEBOOK_SUCCESS, payload: response.data.data})
      //After every time a user logined successfully, we need to add accessToken for later access to API
      api.defaults.headers.common["authorization"] = "Bearer " +  response.data.data.accessToken;
      
      const name = response.data.data.user.name;
      dispatch(alertActions.setAlert(`Welcome back, ${name}`, "success"));
    }catch(error){
      console.log(error)
      dispatch({type: types.LOGIN_REQUEST_FACEBOOK_FAILURE, payload: error})
    }
  }
  
  const loginRequestGoogle = (token) => async (dispatch) => {
    dispatch({ type: types.LOGIN_REQUEST_GOOGLE, payload: null})
  
    try{
      let response = await api.get(`/auth/login/google/${token}`)
      dispatch({type: types.LOGIN_REQUEST_GOOGLE_SUCCESS, payload: response.data.data})
  
      //After every time a user logined successfully, we need to add accessToken for later access to API
      api.defaults.headers.common["authorization"] = "Bearer " + response.data.data.accessToken;
      
      const name = response.data.data.user.name;
      dispatch(alertActions.setAlert(`Welcome back, ${name}`, "success"));
    }catch(error){
      dispatch({type: types.LOGIN_REQUEST_GOOGLE_FAILURE, payload: error})
    }
  }

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

export const authActions = {
  loginRequest,
  register,
  getCurrentUser,
  logout,
  setRedirectTo,
  loginRequestFacebook,
  loginRequestGoogle
};
