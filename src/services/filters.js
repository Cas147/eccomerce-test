export const filterKey = (arr, key) => {
  let arr2 = [];

  arr.forEach((x) => {
    if (
      arr2.some((val) => {
        return val[key].toLowerCase() == x[key].toLowerCase();
      })
    ) {
      arr2.forEach((k) => {
        if (k[key].toLowerCase() === x[key].toLowerCase()) {
          k["occurrence"]++;
        }
      });
    } else {
      let a = {};
      a[key] = x[key];
      a["Marca"] = x["Marca"];
      a["valor"] = x["valor"];
      a["URL"] = x["URL"];
      a["segundoProducto"] = x["segundoProducto"];
      a["occurrence"] = 1;
      a["isChecked"] = false;
      arr2.push(a);
    }
  });

  return arr2;
};

export const filteredProducts = (products, filters) => {
  let finalProductsList = [];
  if (filters.brands.length > 0 && filters.category && filters.priceRange) {
    finalProductsList = products.filter(
      (product) =>
        filters.brands.includes(product.Marca) &&
        product.Categoria === filters.category &&
        product.valor >= filters.priceRange[0] &&
        product.valor <= filters.priceRange[1]
    );
  }
  if (filters.brands.length > 0 && !filters.category && !filters.priceRange) {
    finalProductsList = products.filter((product) =>
      filters.brands.includes(product.Marca)
    );
  }

  if (filters.brands.length > 0 && filters.category && !filters.priceRange) {
    finalProductsList = products.filter(
      (product) =>
        filters.brands.includes(product.Marca) &&
        product.Categoria === filters.category
    );
  }

  if (filters.brands.length > 0 && !filters.category && !filters.priceRange) {
    finalProductsList = products.filter((product) =>
      filters.brands.includes(product.Marca)
    );
  }

  if (!filters.brands.length > 0 && filters.category && !filters.priceRange) {
    finalProductsList = products.filter(
      (product) => product.Categoria === filters.category
    );
  }

  if (!filters.brands.length > 0 && !filters.category && filters.priceRange) {
    finalProductsList = products.filter(
      (product) =>
        product.valor >= filters.priceRange[0] &&
        product.valor <= filters.priceRange[1]
    );
  }

  if (!filters.brands.length > 0 && filters.category && filters.priceRange) {
    finalProductsList = products.filter(
      (product) =>
        product.Categoria === filters.category &&
        product.valor >= filters.priceRange[0] &&
        product.valor <= filters.priceRange[1]
    );
  }

  if (filters.brands.length > 0 && !filters.category && filters.priceRange) {
    finalProductsList = products.filter(
      (product) =>
        filters.brands.includes(product.Marca) &&
        product.valor >= filters.priceRange[0] &&
        product.valor <= filters.priceRange[1]
    );
  }
};
