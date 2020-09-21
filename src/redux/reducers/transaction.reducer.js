import * as types from "../constants/transaction.constants";
const initialState = {
  loading: false,
};

const transactionReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.CREATE_TRANSACTION_REQUEST:
      return { ...state, loading: false };
    case types.CREATE_TRANSACTION_SUCCESS:
      return { ...state, loading: false, transaction: payload };
    case types.CREATE_TRANSACTION_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};
export default transactionReducer;
