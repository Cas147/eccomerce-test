import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from "../../redux/actions/producActions";
import FilterBrands from "../FilterOptions/FilterBrands";
import FilterCategories from "../FilterOptions/FilterCategories";
import FilterPriceRange from "../FilterOptions/FilterPriceRangey";

const FilterDrawer = () => {
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    const response = await axios
      .get("http://test.movilbox.co:888/test_mbox/test.php?metodo=productos")
      .catch((err) => {
        console.los("err", err);
      });

    dispatch(setProducts(response.data));
  };
  const onCleanFilters = () => {
    document.getElementById("brandsForm").reset();
    document.getElementById("categoriesForm").reset();
    document.getElementById("priceRangeForm").reset();
    document.getElementById("priceRangeForm").value = [0, 9000000];
    fetchProducts();

    console.log(document.getElementById("brandsForm").value);
  };

  return (
    <div className=" col-lg-2 d-flex justify-content-center p-0  justify-content-center border-0">
      <div style={{ width: "80%", padding: "0" }}>
        <h6
          className="text-muted w-100"
          style={{ height: "38px", display: "flex", alignItems: "center" }}
        >
          Filtros
        </h6>
        <div className="card w-100 border-0  my-3 bg-body rounded my-3">
          <form id="filterOptions">
            <FilterPriceRange />
            <FilterCategories />
            <FilterBrands />
            <div className="d-flex justify-content-center mb-3">
              <button
                type="button"
                className="btn btn-outline-success "
                style={{ width: "80%" }}
                onClick={onCleanFilters}
              >
                Limpiar Filtros
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FilterDrawer;
