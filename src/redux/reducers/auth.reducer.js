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
        user: { cart: [] },
        loading: false,
      };
    case types.SET_REDIRECT_TO:
      return { ...state, redirectTo: payload };
    case types.LOGIN_REQUEST_FACEBOOK:
      return { ...state, loading: true };
    case types.LOGIN_REQUEST_FACEBOOK_SUCCESS:
      localStorage.setItem("accessToken", payload.accessToken);
      return {
        ...state,
        user: payload.user,
        accessToken: payload.accessToken,
        isAuthenticated: true,
        loading: false,
      };
    case types.LOGIN_REQUEST_FACEBOOK_FAILURE:
      return { ...state, loading: false };
    case types.LOGIN_REQUEST_GOOGLE:
      return { ...state, loading: true };
    case types.LOGIN_REQUEST_GOOGLE_SUCCESS:
      localStorage.setItem("accessToken", payload.accessToken);
      return {
        ...state,
        user: payload.user,
        accessToken: payload.accessToken,
        isAuthenticated: true,
        loading: false,
      };
    case types.LOGIN_REQUEST_GOOGLE_FAILURE:
      return { ...state, loading: false };

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

    default:
      return state;
  }
};

export default authReducer;
