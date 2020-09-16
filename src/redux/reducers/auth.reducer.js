import * as types from "../constants/auth.constants";
const initialState = {
  user: {},
  isAuthenticated: false,
  loading: false,
  accessToken: localStorage.getItem("accessToken"),
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.LOGIN_REQUEST:
    case types.REGISTER_REQUEST:
      return { ...state, loading: true };
    case types.GET_CURRENT_USER_REQUEST:
      return { ...state, loading: true };
    case types.LOGIN_SUCCESS:
      localStorage.setItem("accessToken", payload.accessToken);
      return {
        ...state,
        user: { ...payload.data },
        accessToken: payload.accessToken,
        loading: false,
        isAuthenticated: true,
      };
    case types.GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        user: payload,
        loading: false,
        isAuthenticated: true,
      };

    case types.LOGIN_FAILURE:
    case types.REGISTER_FAILURE:
      return { ...state, loading: false };
    case types.GET_CURRENT_USER_FAILURE:
      return { ...state, loading: false };
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case types.LOGOUT:
      return {
        ...state,
        accessToken: null,
        isAuthenticated: false,
        user: null,
        loading: false,
      };
    case types.SET_REDIRECT_TO:
      return { ...state, redirectTo: payload };
    case types.LOGIN_REQUEST_FACEBOOK:
      return { ...state, loading: true };
    case types.LOGIN_REQUEST_FACEBOOK_SUCCESS:
      localStorage.setItem("accessToken", payload.data.accessToken);
      return {
        ...state,
        user: payload.data,
        isAuthenticated: true,
        loading: false,
      };
    case types.LOGIN_REQUEST_FACEBOOK_FAILURE:
      return { ...state, loading: false };
    case types.LOGIN_REQUEST_GOOGLE:
      return { ...state, loading: true };
    case types.LOGIN_REQUEST_GOOGLE_SUCCESS:
      localStorage.setItem("accessToken", payload.data.accessToken);
      return {
        ...state,
        user: payload.data,
        isAuthenticated: true,
        loading: false,
      };
    case types.LOGIN_REQUEST_GOOGLE_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default authReducer;
