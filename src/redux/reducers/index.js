import { combineReducers } from "redux";
import alertReducer from "./alert.reducer";
import authReducer from "./auth.reducer";
import productReducer from "./product.reducer";

export default combineReducers({
  product: productReducer,
  auth: authReducer,
  alert: alertReducer
});