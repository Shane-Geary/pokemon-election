import { useReducer, useEffect } from "react";
import axios from "axios";

const ACTIONS = {
  fetchPending: "FETCH_PENDING",
  fetchSuccess: "FETCH_SUCCESS",
  fetchError: "FETCH_ERROR"
};

// We set isLoading to true initially,
// this way we won't get data as undefined
// on the first render. You can adjust
// initialState as you need, just remember
// about handling the undefined case for data

// Alternative way would be to set initial data,
// different than undefined, and still have isLoading
// as false initially
const createInitialState = (initialState) => ({
  error: undefined,
  isLoading: true,
  data: undefined,
  ...initialState
});

const fetchReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTIONS.fetchPending:
      return { ...state, isLoading: true, error: undefined };
    case ACTIONS.fetchSuccess:
      return { ...state, ...payload, isLoading: false };
    case ACTIONS.fetchError:
      return { ...state, ...payload, isLoading: false };
    default:
      throw new Error("Not recognized action type in fetchReducer! Typo?");
  }
};

export const useApi = (endpoint, initialState = {}, config = {}) => {
  const [state, dispatch] = useReducer(
    fetchReducer,
    createInitialState(initialState)
  );

  useEffect(() => {
    if (!endpoint) {
      throw new Error("Please, provide an endpoint in order to use this hook!");
    }

    const fetchData = async () => {
      dispatch({ type: ACTIONS.fetchPending });

      try {
        const { data } = await axios.get(endpoint, config);

        dispatch({ type: ACTIONS.fetchSuccess, payload: { data } });
      } catch (e) {
        dispatch({
          type: ACTIONS.fetchError,
          payload: { error: e.message || "Something went wrong" }
        });
      }
    };

    fetchData();
  }, []);

  return state;
};
