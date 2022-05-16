import { ActionTypes } from "../contants/action-types";

export const setCart = (cart = []) => {
  return {
    type: ActionTypes.SET_CART,
    payload: cart,
  };
};
