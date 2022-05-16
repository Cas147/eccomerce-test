import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterKey } from "../services/filters";
import { Link } from "react-router-dom";

import { setCart } from "../redux/actions/cartActions";
import { getTotalCost } from "../services/products";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const filteredCart = filterKey(cart, "nombre");
  const [nombre, setNombre] = React.useState("");
  const [segundoProducto, setSegundoProducto] = React.useState("");

  const [anchorEl, setAnchorEl] = React.useState(null);

  const onSplitCombo = (nombre, segundoProducto) => {
    const primero = cart.find(
      (x) => x.nombre === nombre && x.segundoProducto === segundoProducto
    );
    const combo = cart.find(
      (x) => x.nombre === segundoProducto && x.segundoProducto === nombre
    );

    dispatch(
      setCart(
        cart.map((item) => {
          if (
            JSON.stringify(item) === JSON.stringify(primero) ||
            JSON.stringify(item) === JSON.stringify(combo)
          ) {
            delete item.segundoProducto;
          }
          return item;
        })
      )
    );
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const onRemove = (product, second) => {
    if (second) {
      dispatch(
        setCart(
          cart
            .filter(
              (item) =>
                item.nombre !== product.nombre &&
                item.segundoProducto !== product.segundoProducto
            )
            .filter(
              (item) =>
                second &&
                item.nombre !== second.nombre &&
                item.segundoProducto !== second.segundoProducto
            )
        )
      );
    } else {
      dispatch(setCart(cart.filter((item) => item.nombre !== product.nombre)));
    }
  };

  const onAdd = (product, second) => {
    dispatch(setCart(second ? [...cart, product, second] : [...cart, product]));
  };

  let i = 0;
  let uniqueChars = [];
  const onSubstract = (product) => {
    dispatch(
      setCart(
        cart
          .map((element) => {
            if (
              product.nombre === element.nombre &&
              i === 0 &&
              product.occurrence > 1
            ) {
              i = i + 1;
            } else {
              return element;
            }
          })
          .filter(Boolean)
      )
    );
  };

  function isDuplicate(entry, arr) {
    return arr.some(
      (x) =>
        entry.segundoProducto === x.nombre && entry.nombre === x.segundoProducto
    );
  }

  let newArray = [];
  for (const entry of filteredCart) {
    if (!isDuplicate(entry, newArray)) {
      newArray.push(entry);
    }
  }

  React.useEffect(() => {}, []);
  return (
    <div className="row w-100 p-0 m-0">
      <div className="col-lg-7 col-sm-12 col-md-8">
        <div className="container">
          <h2 className="text-muted mb-3">Detalle</h2>
          <div className="d-flex justify-content-start">
            <div
              class="bg-success rounded"
              style={{
                width: "50px",
                height: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginRight: "20px",
              }}
            >
              <i class="bi bi-cart bg-success rounded">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="white"
                  class="bi bi-cart"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
              </i>
            </div>
            <div>
              <p className="align-self-center text-success m-0">Carrito</p>
              <p className="align-self-end text-muted">Productos del carrito</p>
            </div>
            <svg
              className="mt-3 ml-2"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="black"
              class="bi bi-chevron-right"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </div>
          <div>
            {newArray.map((item) => {
              const { valor, nombre, URL, segundoProducto, Marca, occurrence } =
                item;
              const second = filteredCart.find(
                (x) =>
                  x.nombre === item.segundoProducto &&
                  x.segundoProducto === item.nombre
              );

              return (
                <div>
                  <div className="card w-100 border-0 shadow my-4 bg-body rounded mb-5">
                    <div className="row">
                      <div className="col-md-4 col-sm-12 mt-sm-3">
                        <Link to={`/product/${nombre}`}>
                          <figure
                            className=""
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              flexDirection: "column",
                              width: "100%",
                              height: "100%",
                            }}
                          >
                            {second ? (
                              <div className="h-100 d-block">
                                <img
                                  src={URL}
                                  className="card-img-top "
                                  onerror="this.onerror=null;this.src='https://placeimg.com/200/300/animals';"
                                  alt="..."
                                  style={{
                                    height: "70px",
                                    width: "70px",
                                  }}
                                />
                                <img
                                  src={second.URL}
                                  className="card-img-top "
                                  onerror="this.onerror=null;this.src='https://placeimg.com/200/300/animals';"
                                  alt="..."
                                  style={{
                                    height: "70px",
                                    width: "70px",
                                  }}
                                />
                              </div>
                            ) : (
                              <div>
                                <img
                                  src={URL}
                                  className="card-img-top "
                                  onerror="this.onerror=null;this.src='https://placeimg.com/200/300/animals';"
                                  alt="..."
                                  style={{
                                    height: "160px",
                                    width: "160px",
                                  }}
                                />
                              </div>
                            )}
                          </figure>
                        </Link>
                      </div>
                      <div className="col-md-4 col-sm-6 d-flex flex-column justify-content-center align-items-sm-center align-items-md-start">
                        <p className="fs-6 text-bolder text-muted mb-0">
                          {nombre} {`+ ${second && item.segundoProducto}`}
                        </p>
                        <p className="fs-6 text-bolder text-info mb-4">
                          {Marca}
                        </p>
                        <p className="fs-6 text-muted">Cantidad:</p>
                        <div className="col-2 d-flex align-items-center">
                          <div class="qty d-flex align-items-center mydiv">
                            <span
                              class="minus bg-dark"
                              onClick={() => onSubstract(item, second)}
                            >
                              -
                            </span>
                            <input
                              type="number"
                              class="count myinput"
                              name="qty"
                              value={occurrence}
                            />
                            <span
                              class="plus bg-dark"
                              onClick={() => onAdd(item, second)}
                            >
                              +
                            </span>
                          </div>
                        </div>
                        <p className="fw-light text-info mt-2">
                          {segundoProducto && "10% de descuento por unidad"}
                        </p>
                      </div>
                      <div className="col-md-4 col-sm-6">
                        <div class="d-md-flex h-100 justify-content-around align-items-center ">
                          <div class="vr d-sm-none d-md-block"></div>
                          <div className="d-flex justify-content-center align-items-center flex-column w-100">
                            <h6 class=" text-muted mt-3">
                              <i class="bi bi-cart"></i> COP $
                              {Intl.NumberFormat("de-DE").format(
                                second
                                  ? (second.valor + valor) * occurrence -
                                      (second.valor + valor) * occurrence * 0.1
                                  : valor * occurrence
                              )}
                            </h6>
                            <h6 className="text-info">
                              {segundoProducto && "Combo"}
                            </h6>
                            <button
                              className="btn btn-outline-secondary mt-md-5"
                              value={item}
                              onClick={() => onRemove(item, second)}
                              style={{ width: "140px" }}
                            >
                              <span>Eliminar</span>
                            </button>
                            <div>
                              {second && (
                                <button
                                  className="btn btn-info text-white mt-3 mb-sm-3"
                                  value={item}
                                  onClick={() => {
                                    setNombre(item.nombre);
                                    setSegundoProducto(item.segundoProducto);
                                    onSplitCombo(nombre, segundoProducto);
                                  }}
                                  style={{ width: "140px" }}
                                >
                                  <span>÷ Dividir</span>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="col-lg-5 col-sm-12 col-md-4 container Checkout-container ">
        <div className="card w-100 border-0 shadow my-4 px-5 bg-body rounded p-3">
          <h6 className="text-muted">Detalles del cobro</h6>
          <hr />
          <div className="d-flex justify-content-between">
            <p className="text-muted">Cantidad de articulos:</p>
            <p className="text-info text-bolder">{cart.length}</p>
          </div>
          <div className="d-flex justify-content-between">
            <p className="text-muted">Valor</p>
            <p className="text-info text-bolder">
              COP${Intl.NumberFormat("DE-de").format(getTotalCost(cart))}
            </p>
          </div>
          <div className="d-flex justify-content-between">
            <p className="text-muted">Gastos de envio</p>
            <p className="text-info text-bolder">COP$0</p>
          </div>
          <hr />
          <div className="w-100">
            <div className="d-flex justify-content-between">
              <p className="text-muted">Total</p>
              <h5 className="text-danger">
                COP${Intl.NumberFormat("DE-de").format(getTotalCost(cart))}
              </h5>
            </div>
            <div className="d-flex justify-content-center">
              <Link
                to={"/Checkout/"}
                className="btn btn-success my-3 text-center"
                style={{ width: "70%" }}
              >
                Realizar Pedido
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
