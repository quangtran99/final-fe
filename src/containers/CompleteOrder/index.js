import React from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CompleteOrder = () => {
  const transaction = useSelector((state) => state.transaction.transaction);
  return (
    <div>
      {console.log("abc", transaction)}
      <h1> Thank {transaction?.shipping?.fullName} for your purchasing!</h1>
      <h2>Your order information</h2>
      <div className="cart-information">
        <div style={{ width: "50vw" }}>
          <h2>Address:</h2> <p> {transaction?.shipping?.address}</p>
          <h2>Email:</h2> <p> {transaction?.shipping?.email}</p>
          <h2>Total Price: </h2> <p>{transaction?.totalPrice}</p>
        </div>
        <div style={{ width: "50vw" }}>
          {" "}
          <h2>Payment: </h2> <p>{transaction?.payment}</p>
          <h2>Delivery: </h2> <p>{transaction?.delivery}</p>
          <h2>Status: </h2> <p> {transaction?.status}</p>
        </div>
      </div>
      <Link to="/">
        <Button>Continue Shopping</Button>
      </Link>
    </div>
  );
};

export default CompleteOrder;
