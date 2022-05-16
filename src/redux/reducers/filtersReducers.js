import { ActionTypes } from "../contants/action-types";

export const setBrandsReducer = (state = [], { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_BRANDS:
      return payload;

    default:
      return state;
  }
};

export const setCategoriesReducer = (state = [], { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_CATEGORIES:
      return payload;

    default:
      return state;
  }
};

export const setFiltersReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionTypes.SET_FILTERS:
      return payload;

    default:
      return state;
  }
};
