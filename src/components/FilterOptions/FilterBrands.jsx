import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from "../../redux/actions/producActions";
import { setFilters } from "../../redux/actions/filterActions";
import { filteredProducts } from "../../services/filters";

const FilterBrands = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.allProducts.products);
  const filters = useSelector((state) => state.filters);
  let brands = useSelector((state) => state.brands);
  const [checkedItems, setCheckedItems] = React.useState([]);

  const fetchProducts = async () => {
    const response = await axios
      .get("http://test.movilbox.co:888/test_mbox/test.php?metodo=productos")
      .catch((err) => {
        console.los("err", err);
      });

    if (checkedItems.length === 0) {
      dispatch(setFilters(filters));
      dispatch(setProducts(response.data));
    } else {
      dispatch(
        setProducts(response.data.filter((x) => checkedItems.includes(x.Marca)))
      );
    }
  };

  const handleChange = (event) => {
    const index = brands.findIndex((item) => item.Marca === event.target.name);

    brands[index] = {
      ...brands[index],
      isChecked: brands[index].isChecked === true ? false : true,
    };

    setCheckedItems(
      brands.filter((brand) => brand.isChecked === true).map((x) => x.Marca)
    );
  };

  React.useEffect(() => {
    dispatch(setFilters({ ...filters, brands: [checkedItems] }));
    fetchProducts();
  }, [checkedItems]);

  return (
    <div>
      <lable>Marcas</lable>
      <div className="form-check">
        <form id="brandsForm">
          {brands.map((item) => (
            <div>
              <input
                className="form-check-input form-check-input-bg-primary"
                type="checkbox"
                name={item.Marca}
                checked={checkedItems[item.Marca]}
                onChange={handleChange}
              />
              <label
                key={item.key}
                className="form-check-label d-flex justify-content-between"
              >
                <div>{item.Marca}</div>
                <p className="mx-3 tex-muted">{item.occurrence}</p>
              </label>
              <br />
            </div>
          ))}
        </form>
      </div>
    </div>
  );
};

export default FilterBrands;
