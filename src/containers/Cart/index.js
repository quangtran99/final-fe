import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCartCheckOut from "../../components/ProductCartCheckOut";
import { authActions } from "../../redux/actions";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.auth.user.cart);

  const handleRemove = (productID) => {
    dispatch(authActions.removeProductFromCart(productID));
  };

  const adjustQuantity = (productID, newQuantity) => {
    dispatch(authActions.adjustProductQuantity(productID, newQuantity));
  };
  const updateQuantity = (cart) => {
    dispatch(authActions.updateCartQuantity(cart));
  };
  return (
    <div>
      {cart.length ? (
        <>
          <ProductCartCheckOut
            cart={cart}
            handleRemove={handleRemove}
            adjustQuantity={adjustQuantity}
            updateQuantity={updateQuantity}
          />
        </>
      ) : (
        <p>There are no items</p>
      )}
    </div>
  );
};

export default Cart;
