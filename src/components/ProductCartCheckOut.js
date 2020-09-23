import React from "react";
import { Button, Table } from "react-bootstrap";
import getSymbolFromCurrency from "currency-symbol-map";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinusSquare,
  faPlusSquare,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const ProductCartCheckOut = ({
  cart,
  handleRemove,
  adjustQuantity,
  updateQuantity,
}) => {
  const vnd = getSymbolFromCurrency("VND");

  return (
    <div>
      <Table bordered hover style={{ textAlign: "center" }}>
        <thead>
          <tr>
            <th></th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th> </th>
          </tr>
        </thead>
        {cart.map((item) => (
          <tbody>
            <tr>
              <td>
                {" "}
                <img className="cart-img" src={item.productID.image}></img>
              </td>
              <td>{item.productID.productName}</td>
              <td>
                {item.productID.price} {vnd}
              </td>
              <td>
                <FontAwesomeIcon
                  onClick={() => {
                    if (item.quantity - 1 > 0) {
                      adjustQuantity(item.productID._id, item.quantity - 1);
                    }
                  }}
                  icon={faMinusSquare}
                />
                <input
                  value={item.quantity}
                  onChange={(e) => {
                    if (!isNaN(Number(e.target.value))) {
                      adjustQuantity(item.productID._id, +e.target.value);
                    }
                  }}
                />
                <FontAwesomeIcon
                  onClick={() =>
                    adjustQuantity(item.productID._id, item.quantity + 1)
                  }
                  icon={faPlusSquare}
                />
              </td>
              <td>
                {item.productID.price * item.quantity} {vnd}{" "}
              </td>
              <td>
                <FontAwesomeIcon
                  icon={faTimes}
                  onClick={() => handleRemove(item.productID._id)}
                />
              </td>
            </tr>
          </tbody>
        ))}
      </Table>
      <div>
        <button className="updateCart-btn" onClick={() => updateQuantity(cart)}>
          {" "}
          Update cart{" "}
        </button>
      </div>
      <div>
        <Link to="/">
          <button
            className="continueShopping-btn"
            onClick={() => updateQuantity(cart)}
          >
            Continue Shopping
          </button>
        </Link>
      </div>

      <div className="cart-checkout">
        <h2 className="cart-total">Cart Total</h2>
        <hr></hr>
        <div>
          <Table striped hover style={{ textAlign: "center" }}>
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Total Price</th>
              </tr>
            </thead>
            {cart.map((item) => (
              <tbody>
                <tr>
                  <td>{item.productID.productName}</td>
                  <td>
                    {item.productID.price * item.quantity} {vnd}{" "}
                  </td>
                </tr>
              </tbody>
            ))}
          </Table>
        </div>
        <Link to="/checkout">
          <button className="checkout-btn" onClick={() => updateQuantity(cart)}>
            {" "}
            Check out
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCartCheckOut;
