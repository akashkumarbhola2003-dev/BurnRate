// All possible actions for subscriptions
export const ACTIONS = {
  SET_SUBSCRIPTIONS: "SET_SUBSCRIPTIONS",
  ADD_SUBSCRIPTION: "ADD_SUBSCRIPTION",
  UPDATE_SUBSCRIPTION: "UPDATE_SUBSCRIPTION",
  DELETE_SUBSCRIPTION: "DELETE_SUBSCRIPTION",
  CHANGE_STATUS: "CHANGE_STATUS",
  SET_LOADING: "SET_LOADING",
  SET_ERROR: "SET_ERROR",
};

// Initial state shape
export const initialState = {
  subscriptions: [],
  loading: false,
  error: null,
};

// Pure reducer function — no API calls here, only state transformations
const subscriptionReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };

    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };

    case ACTIONS.SET_SUBSCRIPTIONS:
      return { ...state, subscriptions: action.payload, loading: false, error: null };

    case ACTIONS.ADD_SUBSCRIPTION:
      return {
        ...state,
        subscriptions: [...state.subscriptions, action.payload],
      };

    case ACTIONS.UPDATE_SUBSCRIPTION:
      return {
        ...state,
        subscriptions: state.subscriptions.map((sub) =>
          sub.id === action.payload.id ? action.payload : sub
        ),
      };

    case ACTIONS.DELETE_SUBSCRIPTION:
      return {
        ...state,
        subscriptions: state.subscriptions.filter((sub) => sub.id !== action.payload),
      };

    case ACTIONS.CHANGE_STATUS:
      return {
        ...state,
        subscriptions: state.subscriptions.map((sub) =>
          sub.id === action.payload.id
            ? { ...sub, status: action.payload.status }
            : sub
        ),
      };

    default:
      return state;
  }
};

export default subscriptionReducer;