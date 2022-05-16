import { ActionTypes } from "../contants/action-types";

export const setBrands = (brands = []) => {
  return {
    type: ActionTypes.SET_BRANDS,
    payload: brands,
  };
};

export const setCategories = (categories = []) => {
  return {
    type: ActionTypes.SET_CATEGORIES,
    payload: categories,
  };
};

export const setBrandsArrays = (brands = []) => {
  return {
    type: ActionTypes.SET_BRANDS,
    payload: brands,
  };
};

export const setFilters = (brands = {}) => {
  return {
    type: ActionTypes.SET_FILTERS,
    payload: brands,
  };
};
