import { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import subscriptionReducer, { initialState, ACTIONS } from "../reducer/subscriptionReducer";

// Step 1: Create the context
const SubscriptionContext = createContext();

const API = "http://localhost:5000/subscriptions";

// Step 2: Provider component — wraps the whole app
export const SubscriptionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(subscriptionReducer, initialState);

  // Fetch all subscriptions on app load
  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true });
    try {
      const res = await axios.get(API);
      dispatch({ type: ACTIONS.SET_SUBSCRIPTIONS, payload: res.data });
    } catch (err) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: "Failed to load subscriptions." });
    }
  };

  const addSubscription = async (newSub) => {
    try {
      const res = await axios.post(API, newSub);
      dispatch({ type: ACTIONS.ADD_SUBSCRIPTION, payload: res.data });
    } catch (err) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: "Failed to add subscription." });
    }
  };

  const updateSubscription = async (updatedSub) => {
    try {
      const res = await axios.put(`${API}/${updatedSub.id}`, updatedSub);
      dispatch({ type: ACTIONS.UPDATE_SUBSCRIPTION, payload: res.data });
    } catch (err) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: "Failed to update subscription." });
    }
  };

  const deleteSubscription = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      dispatch({ type: ACTIONS.DELETE_SUBSCRIPTION, payload: id });
    } catch (err) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: "Failed to delete subscription." });
    }
  };

  const changeStatus = async (id, status) => {
    try {
      // patch only updates the status field
      await axios.patch(`${API}/${id}`, { status });
      dispatch({ type: ACTIONS.CHANGE_STATUS, payload: { id, status } });
    } catch (err) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: "Failed to update status." });
    }
  };

  // Everything the whole app needs — state + actions
  const value = {
    subscriptions: state.subscriptions,
    loading: state.loading,
    error: state.error,
    addSubscription,
    updateSubscription,
    deleteSubscription,
    changeStatus,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};

// Step 3: Custom hook so any component can consume context cleanly
export const useSubscriptionContext = () => {
  return useContext(SubscriptionContext);
};
