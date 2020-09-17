import React from "react";
import { Table } from "react-bootstrap";
import getSymbolFromCurrency from "currency-symbol-map";

const ProductCartCheckOut = ({ item }) => {
  const vnd = getSymbolFromCurrency("VND");
  const total = item.productID.price * item.quantity;
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{item.productID.productName}</td>
            <td>
              {item.productID.price} {vnd}
            </td>
            <td>{item.quantity}</td>
            <td>
              {total} {vnd}
            </td>
            <td>X</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export default ProductCartCheckOut;
