import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Popover from "@mui/material/Popover";
import { setCart } from "../redux/actions/cartActions";
import { getTotalCost } from "../services/products";

const Header = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const countedCart = Array.from(
    cart
      .reduce((map, o) => {
        if (map.has(o.nombre)) {
          map.get(o.nombre).count++;
        } else {
          map.set(o.nombre, { ...o, count: 1 });
        }
        return map;
      }, new Map())
      .values()
  );

  const onRemove = (product) => {
    dispatch(setCart(cart.filter((item) => item.nombre !== product.nombre)));
  };

  const onAdd = (product) => {
    dispatch(setCart([...cart, product]));
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
              product.count > 1
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
  return (
    <nav class="navbar navbar-default bg-success mb-5 navbar-fixed-top">
      <div class="w-100 d-flex justify-content-between align-items-center mx-5 ">
        <Link to={"/"} class="navbar-brand text-white " href="#">
          <h4>MovilBox</h4>
        </Link>
        <button
          class="cart position-relative d-inline-flex bg-transparent border-0"
          aria-label="View your shopping cart"
          onClick={handleClick}
        >
          <i class="fas fa fa-shopping-cart fa-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="white"
              class="bi bi-cart2"
              viewBox="0 0 16 16"
            >
              <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l1.25 5h8.22l1.25-5H3.14zM5 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
            </svg>
          </i>
          <span
            class="cart-basket d-flex align-items-start justify-content-center bg-primary text-white rounded-circle"
            style={{ width: "18px" }}
          >
            {cart.length}
          </span>
        </button>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <div style={{ width: "500px", padding: "20px 10px" }}>
            <div className="d-flex w-100 justify-content-between align-items-center">
              <h5 className="text-muted">Tu carrito</h5>
              <div
                className="bg-info text-white rounded-pill text-center"
                style={{ width: "50px" }}
              >
                {cart.length}
              </div>
            </div>
            <hr />
            {countedCart.map((item, index) => {
              const { valor, nombre, URL, combo, descripcion, count, Marca } =
                item;

              return (
                <div>
                  <div className="card  border-0" style={{ height: "80px" }}>
                    <div className="row h-100">
                      <div className="col-2  bg-light d-flex align-items-center">
                        <img
                          src={URL}
                          class="card-img-top"
                          alt="product image"
                          style={{
                            width: "50px",
                            height: "50px",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        />
                      </div>
                      <div className="col-4 ">
                        <p className="m-0 text-truncate my-2">{nombre}</p>
                        <p className="text-muted">{Marca}</p>
                      </div>
                      <div className="col-2 d-flex align-items-center">
                        <div class="qty d-flex align-items-center mydiv">
                          <span
                            class="minus bg-dark"
                            onClick={() => onSubstract(item)}
                          >
                            -
                          </span>
                          <input
                            type="number"
                            class="count myinput"
                            name="qty"
                            value={count}
                          />
                          <span
                            class="plus bg-dark"
                            onClick={() => onAdd(item)}
                          >
                            +
                          </span>
                        </div>
                      </div>
                      <div className="col-4 d-flex flex-column">
                        <button
                          className="border-0 small bg-transparent text-danger align-self-end"
                          onClick={() => onRemove(item)}
                        >
                          x
                        </button>
                        <p className="text-muted" style={{ fontSize: "18px" }}>
                          COP$
                          {Intl.NumberFormat("de-DE").format(
                            (item.segundoProducto
                              ? Math.ceil(item.valor - item.valor * 0.1)
                              : item.valor) * count
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  <hr />
                </div>
              );
            })}
          </div>
          <div className="w-100">
            <div className="d-flex justify-content-between px-3">
              <small>Total</small>
              <p className="text-info">
                COP${Intl.NumberFormat("DE-de").format(getTotalCost(cart))}
              </p>
            </div>
            <div className="d-flex justify-content-center">
              <Link
                onClick={handleClose}
                to={cart.length === 0 ? "#" : "/Checkout/"}
                className="btn btn-success mb-3 text-center"
                style={{ width: "95%" }}
              >
                Checkout
              </Link>
            </div>
          </div>
        </Popover>
      </div>
    </nav>
  );
};

export default Header;
