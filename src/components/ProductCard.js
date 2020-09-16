import React from 'react'
import { Card } from 'react-bootstrap';
import Moment from "react-moment";


const ProductCard = ({ product, handleClick }) => {
  return (
    <Card onClick={() => handleClick(product._id)}>
      <Card.Img
        variant="top"
        src={
          product?.images?.length
            ? product.images[0]
            : "https://via.placeholder.com/160x100"
        }
      />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>
          {product.content.length <= 99
            ? product.content
            : product.content.slice(0, 99) + "..."}
        </Card.Text>
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

export default ProductCard
