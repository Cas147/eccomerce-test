import { ActionTypes } from "../contants/action-types";

export const setGrid = (grid = true) => {
  return {
    type: ActionTypes.SET_GRID,
    payload: grid,
  };
};
