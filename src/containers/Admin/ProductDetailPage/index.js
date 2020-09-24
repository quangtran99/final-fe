import React, { useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions, productActions } from "../../redux/actions";
import { Button, Col } from "react-bootstrap";
import { ClipLoader } from "react-spinners";
import Moment from "react-moment";
import Markdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import getSymbolFromCurrency from "currency-symbol-map";

const ProductDetailPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.selectedProduct);
  const loading = useSelector((state) => state.product.loading);
  const currentUser = useSelector((state) => state.auth.user);
  const history = useHistory();
  const vnd = getSymbolFromCurrency("VND");

  useEffect(() => {
    if (params?.id) {
      dispatch(productActions.getSingleProduct(params.id));
    }
  }, [dispatch, params]);

  const handleBuyNow = (productID) => {
    dispatch(authActions.addProductToCart(productID));
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        {currentUser?._id === product?.author?._id ? (
          <Link to={`/admin/product/edit/${product._id}`}>
            <Button variant="primary">
              <FontAwesomeIcon icon="edit" size="1x" /> Edit
            </Button>
          </Link>
        ) : (
          <></>
        )}

        <span className="text-muted">
          {product?.author?.name} posted{" "}
          <Moment fromNow>{product.createdAt}</Moment>
        </span>
      </div>
      <hr></hr>
      <div>
        {loading ? (
          <ClipLoader color="#f86c6b" size={150} loading={loading} />
        ) : (
          <div className="product-detail-page">
            <Col xl={3} lg={6} md={6}>
              {product && (
                <div className="mb-5">
                  <h2 className="product-name">{product.brand}</h2>
                  <p className="product-name">{product.productName} </p>
                  <p className="product-prize">
                    {product?.price?.toLocaleString()} {vnd}
                  </p>
                  <hr></hr>
                </div>
              )}
            </Col>
            <Col xl={6} lg={6} md={6} sm={12}>
              {product && (
                <img
                  className="product-detail-pic"
                  src={
                    product?.image?.length
                      ? product.image
                      : "https://via.placeholder.com/160x100"
                  }
                  alt=""
                ></img>
              )}
            </Col>
            <Col xl={3} lg={6} md={6}>
              <button
                onClick={() => handleBuyNow(product._id)}
                className="addToCart-btn"
              >
                Add to Cart
              </button>
            </Col>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
