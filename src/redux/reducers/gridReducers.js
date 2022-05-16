import { ActionTypes } from "../contants/action-types";

export const setGridReducer = (state = true, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_GRID:
      return payload;

    default:
      return state;
  }
};
