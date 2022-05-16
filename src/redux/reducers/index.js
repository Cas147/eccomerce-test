import { combineReducers } from "redux";
import { productReducer, selectedProductReducer } from "./productReducers";
import { setGridReducer } from "./gridReducers";
import { setQueryReducer } from "./queryReducers";
import {
  setBrandsReducer,
  setCategoriesReducer,
  setFiltersReducer,
} from "./filtersReducers";
import { setCartReducer } from "./cartReducers";

const reducers = combineReducers({
  allProducts: productReducer,
  grid: setGridReducer,
  query: setQueryReducer,
  brands: setBrandsReducer,
  categories: setCategoriesReducer,
  filters: setFiltersReducer,
  cart: setCartReducer,
});

export default reducers;
