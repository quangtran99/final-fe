import React from "react";
import { Button, Card } from "react-bootstrap";
import Moment from "react-moment";
import getSymbolFromCurrency from "currency-symbol-map";

const ProductCard = ({ product, handleClick, handleBuyNow }) => {
  const vnd = getSymbolFromCurrency("VND");
  return (
    <Card>
      <Card.Img
        onClick={() => handleClick(product._id)}
        variant="top"
        src={
          product?.images?.length
            ? product.images[0]
            : "https://via.placeholder.com/160x100"
        }
      />
      <Card.Body>
        <Card.Title>{product.brand}</Card.Title>
        <Card.Text>
          {product.productName.length <= 99
            ? product.productName
            : product.productName.slice(0, 99) + "..."}
        </Card.Text>
        <Button variant="warning" onClick={() => handleBuyNow(product._id)}>
          Buy now
        </Button>
        <h2>
          {product.price} {vnd}
        </h2>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">
          <span className="text-muted">
            @{product?.author?.name} wrote{" "}
            <Moment fromNow>{product.createdAt}</Moment>
          </span>
        </small>
      </Card.Footer>
    </Card>
  );
};

export default ProductCard;
