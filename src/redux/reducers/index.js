import { combineReducers } from "redux";
import alertReducer from "./alert.reducer";
import authReducer from "./auth.reducer";
import productReducer from "./product.reducer";
import transactionReducer from "./transaction.reducer";

export default combineReducers({
  product: productReducer,
  auth: authReducer,
  alert: alertReducer,
  transaction: transactionReducer,
});
