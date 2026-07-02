// All possible auth actions
export const AUTH_ACTIONS = {
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGOUT: "LOGOUT",
};

// Initial state — checks localStorage so refresh doesn't log the user out
export const initialAuthState = {
  user: JSON.parse(localStorage.getItem("burnrate_user")) || null,
  loading: false,
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };

    case AUTH_ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };

    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return { ...state, user: action.payload, loading: false, error: null };

    case AUTH_ACTIONS.LOGOUT:
      return { ...state, user: null };

    default:
      return state;
  }
};

export default authReducer;