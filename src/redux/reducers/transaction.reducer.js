import * as types from "../constants/transaction.constants";
const initialState = {
  loading: false,
  totalPageNum: 1,
  order: [],
  selectedOrder: {},
};

const transactionReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.CREATE_TRANSACTION_REQUEST:
    case types.UPDATE_ORDER_REQUEST:
    case types.ORDER_REQUEST:
      return { ...state, loading: true };
    case types.CREATE_TRANSACTION_SUCCESS:
      return { ...state, loading: false, transaction: payload };
    case types.UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        order: state.order.map((order) => {
          if (order._id !== payload._id) return order;
          return payload;
        }),
      };
    case types.UPDATE_ORDER_FAILURE:
      return {
        ...state,
        loading: false,
      };
    case types.ORDER_REQUEST_SUCCESS:
      return {
        ...state,
        order: payload.orders,
        totalPageNum: payload.totalPages,
        loading: false,
      };

    case types.ORDER_REQUEST_FAILURE:
    case types.CREATE_TRANSACTION_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};
export default transactionReducer;
