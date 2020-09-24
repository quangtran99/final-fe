import * as types from "../constants/transaction.constants";
import api from "../api";
import { alertActions } from "./alert.actions";

const createNewOrder = (formData) => async (dispatch) => {
  dispatch({ type: types.CREATE_TRANSACTION_REQUEST, payload: null });
  try {
    const res = await api.post("/transaction", { ...formData });

    dispatch({
      type: types.CREATE_TRANSACTION_SUCCESS,
      payload: res.data.data,
    });
    dispatch(alertActions.setAlert("Thank you for your purchase!", "success"));
  } catch (error) {
    dispatch({ type: types.CREATE_TRANSACTION_FAILURE, payload: error });
  }
};

const orderRequest = (
  pageNum = 1,
  limit = 5,
  query = null,
  ownerId = null,
  sortBy = null
) => async (dispatch) => {
  dispatch({ type: types.ORDER_REQUEST, payload: null });
  try {
    const res = await api.get("/transaction");
    dispatch({ type: types.ORDER_REQUEST_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.ORDER_REQUEST_FAILURE, payload: error });
  }
};

const updateStatus = (id) => async (dispatch) => {
  dispatch({ type: types.UPDATE_ORDER_REQUEST, payload: null });
  try {
    const res = await api.put(`/transaction/${id}`);
    dispatch({ type: types.UPDATE_ORDER_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.UPDATE_ORDER_FAILURE, payload: error });
  }
};

export const transactionActions = {
  createNewOrder,
  orderRequest,
  updateStatus,
};
