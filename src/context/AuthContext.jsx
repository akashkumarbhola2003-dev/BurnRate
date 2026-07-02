import { createContext, useContext, useReducer } from "react";
import axios from "axios";
import authReducer, { initialAuthState, AUTH_ACTIONS } from "../reducer/authReducer";

const AuthContext = createContext();

const API = "http://localhost:5000/users";

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  // Checks if username already exists, then creates a new user record
  const register = async (username, password) => {
    dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
    try {
      // Check for existing username first
      const existing = await axios.get(`${API}?username=${username}`);
      if (existing.data.length > 0) {
        dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: "Username already taken." });
        return { success: false };
      }

      const res = await axios.post(API, { username, password });
      const loggedInUser = { id: res.data.id, username: res.data.username };

      localStorage.setItem("burnrate_user", JSON.stringify(loggedInUser));
      dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: loggedInUser });
      return { success: true };
    } catch (err) {
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: "Registration failed. Try again." });
      return { success: false };
    }
  };

  // Looks up username, checks password match
  const login = async (username, password) => {
    dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: true });
    try {
      const res = await axios.get(`${API}?username=${username}`);

      if (res.data.length === 0) {
        dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: "No account found with that username." });
        return { success: false };
      }

      const foundUser = res.data[0];
      if (foundUser.password !== password) {
        dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: "Incorrect password." });
        return { success: false };
      }

      const loggedInUser = { id: foundUser.id, username: foundUser.username };
      localStorage.setItem("burnrate_user", JSON.stringify(loggedInUser));
      dispatch({ type: AUTH_ACTIONS.LOGIN_SUCCESS, payload: loggedInUser });
      return { success: true };
    } catch (err) {
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: "Login failed. Try again." });
      return { success: false };
    }
  };

  const logout = () => {
    localStorage.removeItem("burnrate_user");
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
  };

  const value = {
    user: state.user,
    loading: state.loading,
    error: state.error,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);