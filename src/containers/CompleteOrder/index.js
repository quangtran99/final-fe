import React from "react";
import { useSelector } from "react-redux";

const CompleteOrder = () => {
  const transaction = useSelector((state) => state.transaction.transaction);
  return (
    <div>
      {console.log("abc", transaction)}
      <h1> Thank you for your purchasing!</h1>
      <h2>Your order information:</h2>
      <p>Name: {transaction?.shipping?.fullName}</p>
      <p>Address: {transaction?.shipping?.address}</p>
      <p>Order info: </p>
      <p>Brand:{transaction?.products[0]?.productID?.brand}</p>
      <p>Product Name: {transaction?.products[0]?.productID?.productName} </p>
      <p>Price: {transaction?.products[0]?.productID?.price}</p>
      <p>Quantity: {transaction?.products[0]?.quantity}</p>
      <p>Total Price:</p>
      <p>Status: </p>
    </div>
  );
};

export default CompleteOrder;
