import React from "react";
import { Table } from "react-bootstrap";
import getSymbolFromCurrency from "currency-symbol-map";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusSquare } from "@fortawesome/free-solid-svg-icons";

const ProductCartCheckOut = ({ cart, handleRemove }) => {
  const vnd = getSymbolFromCurrency("VND");

  return (
    <div>
      <Table striped bordered hover style={{ textAlign: "center" }}>
        <thead>
          <tr>
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
              <td>{item.productID.productName}</td>
              <td>
                {item.productID.price} {vnd}
              </td>
              <td>{item.quantity}</td>
              <td>
                {item.productID.price * item.quantity} {vnd}{" "}
              </td>
              <td>
                <FontAwesomeIcon
                  icon={faMinusSquare}
                  onClick={() => handleRemove(item.productID._id)}
                />
              </td>
            </tr>
          </tbody>
        ))}
      </Table>
    </div>
  );
};

export default ProductCartCheckOut;
