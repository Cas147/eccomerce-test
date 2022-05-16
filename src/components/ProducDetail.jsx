import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NoFound from "./noFound";
import { setCart } from "../redux/actions/cartActions";
import DialogCombo from "./Dialog/DialogCombo";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { ProductName } = useParams();
  const products = useSelector((state) => state.allProducts.products);
  const cart = useSelector((state) => state.cart);
  const selectedProduct = products.find(
    (product) => product.nombre === ProductName
  );
  const [selecProduct, setSelecProduct] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onAddProduct = (product) => {
    if (product.combo === 0) {
      dispatch(setCart([...cart, product]));
    } else {
      setSelecProduct(product);
      handleClickOpen();
    }
  };

  return (
    <div>
      {typeof selectedProduct !== "undefined" ? (
        <div className="container">
          <h2 className="text-muted mb-5">Detalle</h2>

          <div class="card border-0 shadow my-3 bg-body rounded">
            <div class="row ">
              <div class="col-md-5 d-flex justify-content-center align-items-center">
                <img
                  src={selectedProduct.URL}
                  class="card-img-top h-100"
                  alt="product image"
                  style={{ width: "400px", height: "400px" }}
                />
              </div>
              <div class="col-md-7 my-5">
                <div class="card-body">
                  <h4 class="card-title text-muted">
                    {selectedProduct.nombre}
                  </h4>
                  <h6 class="card-title text-muted mb-4">
                    Elaborado por {selectedProduct.Marca}
                  </h6>
                  <h3 class="card-title text-muted">
                    COP $
                    {Intl.NumberFormat("DE-de").format(selectedProduct.valor)}
                  </h3>
                  <p class="card-text text-info">
                    {selectedProduct.descripcion}
                  </p>
                  <p class="card-text">
                    Non sunt nobis sed autem fugiat eos ipsam ducimus ab
                    corrupti quod aut numquam quaerat? Est exercitationem omnis
                    qui enim nihil sed repudiandae officia nam sapiente
                    doloremque aut totam obcaecati quo natus dolorum At omnis
                    voluptatum. Ut eveniet dicta ut facilis inventore et
                    voluptatem voluptates sit nihil asperiores.
                  </p>
                  <p class="iwt">
                    <i class="bi bi-send" style={{ marginRight: "20px" }}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="#0d6efd"
                        class="bi bi-send"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z" />
                      </svg>
                    </i>
                    <span className="text-bold text-primary">
                      Envio gratis!
                    </span>
                  </p>
                  <hr
                    class="bg-danger border-2 border-top border-secondary mt-8"
                    style={{ marginTop: "140px" }}
                  ></hr>
                  <button
                    className="btn btn-success"
                    onClick={() => {
                      onAddProduct(selectedProduct);
                    }}
                  >
                    <div className="d-flex  w-100 justify-content-center align=items-center">
                      <i class="bi bi-cart  mx-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="white"
                          class="bi bi-cart"
                          viewBox="0 0 16 16"
                        >
                          <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                        </svg>
                      </i>
                      <span>Agregar al carrito</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <DialogCombo
            open={open}
            handleClose={handleClose}
            selectedProduct={selecProduct}
          />
        </div>
      ) : (
        <NoFound />
      )}
    </div>
  );
};

export default ProductDetail;
