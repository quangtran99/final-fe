import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ProductCartCheckOut from "../../components/ProductCartCheckOut";

const Cart = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.products);
    const history = useHistory();
  return (
    <div>
        <ProductCartCheckOut 
        
        />
    </div>
  );
};

export default Cart;
