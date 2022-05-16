import { ActionTypes } from "../contants/action-types";

export const setQueryReducer = (state = "", { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_QUERY:
      return payload;

    default:
      return state;
  }
};
