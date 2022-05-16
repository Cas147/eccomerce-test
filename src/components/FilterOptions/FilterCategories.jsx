import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setProducts } from "../../redux/actions/producActions";
import { setFilters } from "../../redux/actions/filterActions";
import { filteredProducts } from "../../services/filters";

const FilterCategories = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.allProducts.products);
  let categories = useSelector((state) => state.categories);
  const filters = useSelector((state) => state.filters);
  const [selectedCategory, setSelectedCategory] = React.useState("");

  const fetchProducts = async () => {
    const response = await axios
      .get("http://test.movilbox.co:888/test_mbox/test.php?metodo=productos")
      .catch((err) => {
        console.los("err", err);
      });

    if (selectedCategory === "") {
      dispatch(setFilters(filters));
      dispatch(setProducts(response.data));
    } else {
      dispatch(
        setProducts(
          response.data.filter(
            (x) =>
              x.Categoria.toLowerCase() === selectedCategory.toLocaleLowerCase()
          )
        )
      );
    }
  };

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
    dispatch(setFilters({ ...filters, category: selectedCategory }));
  };

  React.useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  return (
    <div>
      <lable>Categorias</lable>
      <div className="form-check">
        <form id="categoriesForm">
          {categories.map((item) => (
            <div>
              <input
                className="form-check-input form-check-input-bg-primary"
                type="radio"
                name="category"
                value={item.Categoria}
                onChange={handleChange}
              />
              <label
                key={item.key}
                className="form-check-label d-flex justify-content-between"
              >
                <div>{item.Categoria}</div>
              </label>
              <br />
            </div>
          ))}
        </form>
      </div>
    </div>
  );
};

export default FilterCategories;
