import { ActionTypes } from "../contants/action-types";

export const setQuery = (query = "") => {
  return {
    type: ActionTypes.SET_QUERY,
    payload: query,
  };
};
