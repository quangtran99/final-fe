import { combineReducers } from "redux";
import alertReducer from "./alert.reducer";
import authReducer from "./auth.reducer";
import blogReducer from "./blog.reducer";

export default combineReducers({
  blog: blogReducer,
  auth: authReducer,
  alert: alertReducer
});