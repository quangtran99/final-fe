import React from 'react'
import { Button, Card } from 'react-bootstrap';
import Moment from "react-moment";


const ProductCard = ({ product, handleClick, handleBuyNow }) => {
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
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>
          {product.content.length <= 99
            ? product.content
            : product.content.slice(0, 99) + "..."}
        </Card.Text>
        <Button variant="warning" onClick={() => handleBuyNow(product)} >Buy now</Button>
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
