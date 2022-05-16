import React from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setQuery } from "../redux/actions/queryAction";

const SearchInput = () => {
  const dispatch = useDispatch();

  return (
    <div className="search">
      <input
        type="text"
        className="form-control p-2 my-3 w-90"
        placeholder="Buscar"
        onChange={(event) => dispatch(setQuery(event.target.value))}
      ></input>
    </div>
  );
};

export default SearchInput;
