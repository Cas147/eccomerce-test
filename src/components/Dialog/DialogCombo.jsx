import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";

import Typography from "@mui/material/Typography";
import { setCart } from "../../redux/actions/cartActions";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      sx={{ m: 0, p: 2 }}
      {...other}
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "600px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: "10px" }}>Combo :</div>
          <div
            className="bg-info text-white rounded-pill text-center"
            style={{ width: "90px", height: "32px" }}
          >
            2 items
          </div>
        </div>
        <p className="text-danger">
          COP$
          {Intl.NumberFormat("DE-de").format(
            props.valueTwo ? props.valueOne + props.valueTwo : props.valueOne
          )}
        </p>
      </div>

      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 0,
            top: -12,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <small>x</small>
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function DialogCombo(props) {
  const [pickedProduct, setPickedProduct] = React.useState({});
  const dispatch = useDispatch();
  const products = useSelector((state) => state.allProducts.products);
  const cart = useSelector((state) => state.cart);
  let newCart = cart;

  const onSelectCombo = (event) => {
    setPickedProduct(products.find((x) => x.nombre === event.target.value));
  };

  const onAddCombo = (productOne, productTwo) => {
    newCart.push({
      ...productTwo,
      segundoProducto: productOne.nombre,
    });

    newCart.push({
      ...productOne,
      segundoProducto: productTwo.nombre,
    });
    dispatch(setCart(newCart));

    props.handleClose();
  };

  return (
    <div>
      <BootstrapDialog
        onClose={props.handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={props.handleClose}
          valueOne={props.selectedProduct.valor}
          valueTwo={pickedProduct.valor}
        ></BootstrapDialogTitle>
        <DialogContent dividers>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "end",
            }}
          >
            <select
              class="form-select form-select-lg mb-3"
              aria-label=".form-select-lg example"
              style={{ width: "45%" }}
              onChange={(event) => onSelectCombo(event)}
            >
              <option selected>Seleccione el combo</option>
              {products
                .filter(
                  (product) =>
                    product.combo === 1 &&
                    product.nombre !== props.selectedProduct.nombre
                )
                .map((product) => {
                  return (
                    <option value={product.nombre}>{product.nombre}</option>
                  );
                })}
            </select>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <div
              style={{
                width: "45%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={props.selectedProduct.URL}
                alt="product image"
                style={{
                  width: "50%",
                  height: "200px",
                  margin: "0 auto",
                }}
              />
              <p
                className="text-center text-muted"
                style={{ marginBottom: "5px" }}
              >
                {props.selectedProduct.nombre}
              </p>
              <p className="text-center text-muted">
                {props.selectedProduct.descripcion}
              </p>
            </div>
            <div
              style={{
                width: "5%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h2 className="text-danger">+</h2>
            </div>
            <div
              style={{
                width: "45%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {pickedProduct.URL && (
                <img
                  src={pickedProduct.URL}
                  alt="picked product"
                  style={{
                    width: "50%",
                    height: "200px",
                    margin: "0 auto",
                  }}
                />
              )}

              <p
                className="text-center text-muted"
                style={{ marginBottom: "5px" }}
              >
                {pickedProduct.nombre}
              </p>
              <p className="text-center text-muted">
                {pickedProduct.descripcion}
              </p>
            </div>
          </div>
          <h5 className="text-center text-muted mt-3">
            Los productos están disponibles en COMBOS
          </h5>
          <p className="text-danger text-mutes text-center text-bold fs-6  fw-bolder">
            Desea agregarlo al carrito?
          </p>
        </DialogContent>
        <DialogActions>
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <button
              type="button"
              class="btn btn-success"
              style={{ width: "100px", height: "45px", marginRight: "20px" }}
              onClick={() =>
                Object.keys(props.selectedProduct).length > 0 &&
                Object.keys(pickedProduct).length > 0 &&
                onAddCombo(props.selectedProduct, pickedProduct)
              }
            >
              Agregar
            </button>
            <button
              type="button"
              class="btn btn-outline-secondary"
              onClick={props.handleClose}
              style={{ width: "100px", height: "45px" }}
            >
              Cancelar
            </button>
          </div>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
