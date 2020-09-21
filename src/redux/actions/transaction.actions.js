import * as types from "../constants/transaction.constants";
import api from "../api";
import { alertActions } from "./alert.actions";

const createNewOrder = (formData, totalPrice = null) => async (dispatch) => {
  dispatch({ type: types.CREATE_TRANSACTION_REQUEST, payload: null });
  try {
    const res = await api.post("/transaction", { ...formData, totalPrice });

    dispatch({
      type: types.CREATE_TRANSACTION_SUCCESS,
      payload: res.data.data,
    });
    dispatch(alertActions.setAlert("Thank you for your purchase!", "success"));
  } catch (error) {
    dispatch({ type: types.CREATE_TRANSACTION_FAILURE, payload: error });
  }
};

export const transactionActions = { createNewOrder };
