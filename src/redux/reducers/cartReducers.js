import { ActionTypes } from "../contants/action-types";

export const setCartReducer = (state = [], { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_CART:
      return payload;

    default:
      return state;
  }
};
