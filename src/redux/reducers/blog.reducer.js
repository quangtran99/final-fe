import * as types from "../constants/blog.constants";

const initialState = {
  blogs: [],
  loading: false,
};

const blogReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.BLOG_REQUEST:
      return { ...state, loading: true };
    case types.BLOG_REQUEST_SUCCESS:
      return { ...state, blogs: payload, loading: false };
    case types.BLOG_REQUEST_FAILURE:
      console.log(payload);
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default blogReducer;