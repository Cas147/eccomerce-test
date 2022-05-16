import React from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { setProducts } from "../../redux/actions/producActions";
import "../../services/multirange";
import "../../";

import { teal } from "@mui/material/colors";
import Slider from "@mui/material/Slider";
import { setFilters } from "../../redux/actions/filterActions";
import { filteredProducts } from "../../services/filters";

function valuetext(value) {
  return `${value}°C`;
}

const FilterPriceRange = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.allProducts.products);
  const filters = useSelector((state) => state.filters);
  let categories = useSelector((state) => state.categories);
  const [value, setValue] = React.useState([0, 9000000]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    dispatch(setFilters({ ...filters, priceRange: value }));
  };

  const onPriceRange = (event) => {
    setValue(event.target.value.split(",").map((str) => Number(str)));
    dispatch(setFilters({ ...filters, priceRange: value }));
  };

  const fetchProducts = async () => {
    const response = await axios
      .get("http://test.movilbox.co:888/test_mbox/test.php?metodo=productos")
      .catch((err) => {
        console.los("err", err);
      });

    if (value === [0, 9000000]) {
      dispatch(setFilters(filters));
      dispatch(setProducts(response.data));
    } else {
      dispatch(
        setProducts(
          response.data.filter(
            (x) => x.valor >= value[0] && x.valor <= value[1]
          )
        )
      );
    }
  };

  React.useEffect(() => {
    fetchProducts();
  }, [value]);

  return (
    <form id="priceRangeForm">
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="price"
          value={[0, 9000000]}
          onChange={onPriceRange}
          id="flexRadioDefault1"
        />
        <label class="form-check-label" for="flexRadioDefault1">
          todos
        </label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="price"
          value={[0, 500000]}
          onChange={onPriceRange}
          id="flexRadioDefault2"
        />
        <label class="form-check-label" for="flexRadioDefault2">
          {"<=COP$500.000"}
        </label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="price"
          value={[500000, 2000000]}
          onChange={onPriceRange}
          id="flexRadioDefault2"
        />
        <label class="form-check-label" for="flexRadioDefault2">
          {"COP$500.000 - 2.000.000"}
        </label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          name="price"
          value={[2000000, 9000000]}
          onChange={onPriceRange}
          id="flexRadioDefault2"
        />
        <label class="form-check-label" for="flexRadioDefault2">
          {">=COP$2.000.000"}
        </label>
      </div>

      <div className="my-5" style={{ width: "80%", margin: "0 auto" }}>
        <Slider
          getAriaLabel={() => "Temperature range"}
          value={value}
          max={9000000}
          min={0}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          color="info"
          valueLabelFormat={(x) => Intl.NumberFormat("de-DE").format(x)}
        />
      </div>
    </form>
  );
};

export default FilterPriceRange;
