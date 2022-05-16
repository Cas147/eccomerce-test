export const filterProducts = (products, query) => {
  return products.filter((product) => {
    if (query && query === "") {
      return product;
    } else if (product.nombre.toLowerCase().includes(query.toLowerCase())) {
      return product;
    }
  });
};

export const getTotalCost = (cart) => {
  return cart.reduce(function (prev, curr) {
    return Math.ceil(
      prev + (curr.segundoProducto ? curr.valor - curr.valor * 0.1 : curr.valor)
    );
  }, 0);
};
