import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setGrid } from "../redux/actions/gridAction";

import ProductComponent from "./ProductComponent";
import ProductComponentVertical from "./ProductComponentVertical";
import SearchInput from "./SearchInput";
import { filterProducts } from "../services/products";
import NoFound from "./noFound";
import FilterPanel from "./FilterPanel/index";
import Drawer from "@mui/material/Drawer";
import FilterDrawer from "./FilterPanel/drawer";

const ProductListing = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.allProducts.products);
  const grid = useSelector((state) => state.grid);
  const query = useSelector((state) => state.query);
  const [open, setOpen] = useState(false);

  return (
    <div className="row">
      <div className="container drawerFilter">
        <button
          className="btn btn-outline-secondary mb-2"
          onClick={() => setOpen(true)}
          style={{ width: "120px", height: "40px" }}
        >
          Filters
        </button>
      </div>
      <Drawer anchor={"left"} open={open} onClose={() => setOpen(false)}>
        <FilterDrawer />
      </Drawer>
      <FilterPanel />
      <div className="col-lg-10 col-sm-12">
        <div style={{ width: "90%", margin: "0 auto" }}>
          <div className="d-flex w-100 justify-content-between align-items-center">
            <h6 className="text-muted w-100">
              {filterProducts(products, query).length} Resultados encontrados
            </h6>
            <div className="d-flex w-100 justify-content-end ">
              <button
                type="button"
                className="btn btn-outline-success mr-2 .d-sm-none .d-md-block"
                onClick={() => dispatch(setGrid(false))}
              >
                <i class="bi bi-list-ul">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-list-ul"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
                    />
                  </svg>
                </i>
              </button>
              <button
                type="button"
                className="btn btn-outline-success mr-2"
                onClick={() => dispatch(setGrid(true))}
              >
                <i class="bi bi-list-ul">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-grid"
                    viewBox="0 0 16 16"
                  >
                    <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z" />
                  </svg>
                </i>
              </button>
            </div>
          </div>
          <SearchInput />
          {filterProducts(products, query).length > 0 ? (
            <div>
              {grid ? <ProductComponent /> : <ProductComponentVertical />}
            </div>
          ) : (
            <NoFound />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
