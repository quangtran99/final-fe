import * as types from "../constants/auth.constants";
const initialState = {
  user: { cart: [] },
  loading: false,
  accessToken: localStorage.getItem("accessToken"),
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.LOGIN_REQUEST:
    case types.REGISTER_REQUEST:
    case types.LOGIN_FACEBOOK_REQUEST:
    case types.UPDATE_PROFILE_REQUEST:
    case types.LOGIN_GOOGLE_REQUEST:
    case types.VERIFY_EMAIL_REQUEST:
      return { ...state, loading: true };
    case types.GET_CURRENT_USER_REQUEST:
      return { ...state, loading: true };
    case types.LOGIN_SUCCESS:
      localStorage.setItem("accessToken", payload.accessToken);
      return {
        ...state,
        user: payload.user,
        accessToken: payload.accessToken,
        loading: false,
        isAuthenticated: true,
      };
    case types.UPDATE_PROFILE_SUCCESS:
      return { ...state, loading: false, user: { ...state.user, payload } };
    case types.GET_CURRENT_USER_SUCCESS:
      return {
        ...state,
        user: payload,
        loading: false,
        isAuthenticated: true,
      };

    case types.VERIFY_EMAIL_SUCCESS:
      localStorage.setItem("accessToken", payload.accessToken);
      return {
        ...state,
        user: { ...payload.user },
        accessToken: payload.accessToken,
        loading: false,
        isAuthenticated: true,
      };

    case types.LOGIN_FAILURE:
    case types.LOGIN_FACEBOOK_FAILURE:
    case types.LOGIN_GOOGLE_FAILURE:
    case types.VERIFY_EMAIL_FAILURE:
    case types.REGISTER_FAILURE:
      return { ...state, loading: false, isAuthenticated: false };
    case types.UPDATE_PROFILE_FAILURE:
      return { ...state, loading: false };

    case types.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        redirectTo: "/verify/_",
      };
    case types.LOGOUT:
    case types.GET_CURRENT_USER_FAILURE:
      return {
        ...state,
        accessToken: null,
        isAuthenticated: false,
        user: { cart: [] },
        loading: false,
      };
    case types.SET_REDIRECT_TO:
      return { ...state, redirectTo: payload };
    case types.LOGIN_FACEBOOK_SUCCESS:
    case types.LOGIN_GOOGLE_SUCCESS:
      localStorage.setItem("accessToken", payload.accessToken);
      return {
        ...state,
        user: { ...payload.user, cart: [] },
        accessToken: payload.accessToken,
        loading: false,
        isAuthenticated: true,
      };

    case types.ADD_PRODUCT_TO_CART_REQUEST:
      return { ...state, loading: true };

    case types.ADD_PRODUCT_TO_CART_SUCCESS:
      return {
        ...state,
        user: { ...state.user, cart: payload },
        loading: false,
      };

    case types.ADD_PRODUCT_TO_CART_FAILURE:
      return { ...state, loading: false };

    // // payload = {productID:'...', qty: 1}
    // const item = state.cart.find(product => product._id === payload._id)
    // if (item) {
    //   return {...state, cart: state.cart.map(product => {
    //     if (product._id !== payload._id) return product;
    //     return {...product, qty: product.qty + payload.qty}
    //   })}
    // } else {
    //   return {...state, cart: [...state.cart, payload]}
    // }

    case types.REMOVE_PRODUCT_TO_CART_REQUEST:
      return { ...state, loading: true };

    case types.REMOVE_PRODUCT_TO_CART_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          cart: state.user.cart.filter(
            (product) => product.productID._id !== payload
          ),
        },
        loading: false,
      };

    case types.REMOVE_PRODUCT_TO_CART_FAILURE:
      return { ...state, loading: false };

    case types.ADJUST_PRODUCT_QUANTITY:
      return {
        ...state,
        user: {
          ...state.user,
          cart: state.user.cart.map((item) => {
            if (item.productID._id === payload.productID) {
              return { ...item, quantity: payload.newQuantity };
            }
            return { ...item };
          }),
        },
      };
    case types.UPDATE_CART_QUANTITY_REQUEST:
      return { ...state, loading: true };
    case types.UPDATE_CART_QUANTITY_FAILURE:
      return { ...state, loading: false };
    case types.UPDATE_CART_QUANTITY_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default authReducer;
