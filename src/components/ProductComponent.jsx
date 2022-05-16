import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { getViewport } from "../services/screenSize";
import { Link } from "react-router-dom";
import { filterProducts } from "../services/products";
import { setCart } from "../redux/actions/cartActions";
import DialogCombo from "./Dialog/DialogCombo";

const ProductComponent = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.allProducts.products);
  const cart = useSelector((state) => state.cart);
  const [page, setPageSelected] = React.useState(0);
  const [screenSize, setScreenSize] = React.useState("");
  const query = useSelector((state) => state.query);
  const [open, setOpen] = React.useState(false);
  const [selectedProduct, setSelectedProduct] = React.useState("");

  const handlePageCLick = (data) => {
    if (data.selected === 0) {
      setPageSelected(data.selected);
    } else {
      setPageSelected(data.selected * (screenSize === "md" ? 6 : 9));
    }
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

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
      setSelectedProduct(product);
      handleClickOpen();
    }
  };

  React.useEffect(() => {
    setScreenSize(getViewport);
  }, []);

  return (
    <div>
      <div>
        <div className="row card-deck m-2">
          {filterProducts(products, query)
            .slice(page, page + (screenSize === "md" ? 6 : 9))
            .map((product) => {
              const { valor, nombre, URL, combo, descripcion } = product;
              return (
                <div class="col-md-6 col-lg-4 v my-3 border-0">
                  <div className="card shadow w-100 h-100 justify-content-between">
                    <Link to={`/product/${nombre}`}>
                      <div class="card-body ">
                        <figure className="w-100 d-flex justify-content-center">
                          <img
                            class="card-img-top w-200px text-center my-3 img-responsive"
                            src={URL}
                            onError="this.onerror=null;this.src='https://cdn3.iconfinder.com/data/icons/empty-states-line/32/Tasks_Empty_states-512.png';"
                            alt="Card  cap"
                            style={{ height: "350px", width: "200px" }}
                          />
                        </figure>

                        <div className="d-flex justify-content-between align-items-center mt-2 mb-2">
                          <h6 className="text-info">
                            {combo === 1 && "Combo"}
                          </h6>
                          <h5 class=" text-muted">
                            <i class="bi bi-cart"></i> COP $
                            {Intl.NumberFormat("de-DE").format(valor)}
                          </h5>
                        </div>
                        <h6 class="card-text">
                          <i class="bi bi-cart"></i>
                          {nombre}
                        </h6>

                        <h6 class="card-text text-muted">{descripcion}</h6>
                      </div>
                    </Link>
                    <button
                      className="btn btn-success w-100"
                      onClick={() => {
                        onAddProduct(product);
                      }}
                    >
                      <div className="d-flex  w-100 justify-content-center align=items-center">
                        <i class="bi bi-cart  mx-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-cart"
                            viewBox="0 0 16 16"
                          >
                            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                          </svg>
                        </i>{" "}
                        <span>Agregar al carrito</span>
                      </div>
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div>
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          pageCount={Math.ceil(
            filterProducts(products, query).length /
              (screenSize === "md" ? 6 : 9)
          )}
          marginPagesDisplayed={2}
          onPageChange={handlePageCLick}
          containerClassName={"pagination justify-content-center"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </div>
      <DialogCombo
        open={open}
        handleClose={handleClose}
        selectedProduct={selectedProduct}
      />
    </div>
  );
};

export default ProductComponent;
