import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ProductCartCheckOut from "../../components/ProductCartCheckOut";
import { authActions } from "../../redux/actions";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.auth.user.cart);
  const history = useHistory();

  const handleRemove = (productID) => {
    dispatch(authActions.removeProductFromCart(productID));
  };
  return (
    <div>
      {cart.length ? (
        <>
          <ProductCartCheckOut cart={cart} handleRemove={handleRemove} />
        </>
      ) : (
        <p>There are no items</p>
      )}
    </div>
  );
};

export default Cart;
