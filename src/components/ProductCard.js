import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Moment from "react-moment";
import getSymbolFromCurrency from "currency-symbol-map";

const ProductCard = ({ product, handleClick, handleBuyNow }) => {
  const vnd = getSymbolFromCurrency("VND");
  return (
    <Col
      md={4}
      style={{ textAlign: "center" }}
      onClick={() => handleClick(product._id)}
    >
      <img
        className="product-size"
        src={
          product?.image?.length
            ? product.image
            : "https://via.placeholder.com/160x100"
        }
      ></img>
      <div className="product-info">
        <h4>{product.brand}</h4>
        <p>
          {" "}
          {product.productName.length <= 99
            ? product.productName
            : product.productName.slice(0, 99) + "..."}
        </p>
        <p>
          {" "}
          {product?.price && product.price.toLocaleString()} {vnd}
        </p>
      </div>
    </Col>
  );
};

export default ProductCard;
