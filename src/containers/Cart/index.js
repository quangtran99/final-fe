import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ProductCartCheckOut from "../../components/ProductCartCheckOut";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.auth.user.cart);
  const history = useHistory();
  return (
    <div>
      {cart.length ? (
        <>
          {cart.map((item) => (
            <ProductCartCheckOut item={item} />
          ))}
        </>
      ) : (
        <p>There are no items</p>
      )}
    </div>
  );
};

export default Cart;
