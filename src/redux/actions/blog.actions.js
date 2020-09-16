import * as types from "../constants/blog.constants";
import api from "../api";

const blogsRequest = () => async (dispatch) => {
  dispatch({ type: types.BLOG_REQUEST, payload: null });
  try {
    const res = await api.get("/blogs");
    dispatch({ type: types.BLOG_REQUEST_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.BLOG_REQUEST_FAILURE, payload: error });
  }
};

export const blogActions = {
  blogsRequest,
};