import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ProductListing from "./components/ProductListing";
import ProductDetail from "./components/ProducDetail";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { setProducts } from "./redux/actions/producActions";

import "./App.css";
import { setBrands } from "./redux/actions/filterActions";
import { setCategories } from "./redux/actions/filterActions";
import { filterKey } from "./services/filters";
import CheckoutPage from "./components/CheckoutPage";

function App() {
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    const response = await axios
      .get("http://test.movilbox.co:888/test_mbox/test.php?metodo=productos")
      .catch((err) => {
        console.los("err", err);
      });

    dispatch(setProducts(response.data));

    dispatch(setBrands(filterKey(response.data, "Marca")));

    dispatch(setCategories(filterKey(response.data, "Categoria")));
  };

  React.useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ProductListing />} />
        <Route path="/Product/:ProductName" exact element={<ProductDetail />} />
        <Route path="/Checkout/" exact element={<CheckoutPage />} />
        <Route>404 Not Found</Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
