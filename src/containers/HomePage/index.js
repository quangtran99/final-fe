import React, { useEffect, useState } from "react";
import {
  Button,
  CardColumns,
  Container,
  Jumbotron,
  Row,
  Col,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import PaginationItem from "../../components/PaginationItem";
import ProductCard from "../../components/ProductCard";
import { authActions, productActions } from "../../redux/actions";

function HomePage() {
  const [pageNum, setPageNum] = useState(1);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.product.loading);
  const products = useSelector((state) => state.product.products);
  const totalPageNum = useSelector((state) => state.product.totalPageNum);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const history = useHistory();

  useEffect(() => {
    dispatch(productActions.productsRequest(pageNum));
  }, [dispatch, pageNum]);

  const handleClickOnProduct = (id) => {
    history.push(`/products/${id}`);
  };

  const handleBuyNow = (productID) => {
    dispatch(authActions.addProductToCart(productID));
  };

  const generateCard = (products) => {
    const rows = [];
    for (let i = 0; i < products.length + 3; i += 3) {
      let cols = [];
      for (let j = 0; j < 3; j++) {
        if (i + j < products.length) {
          let product = products[i + j];
          cols.push(
            <ProductCard
              product={product}
              key={product._id}
              handleClick={handleClickOnProduct}
              handleBuyNow={handleBuyNow}
            />
          );
        }
      }
      rows.push(<Row>{cols}</Row>);
    }
    return rows;
  };

  return (
    <Container>
      {loading ? (
        <ClipLoader color="#f86c6b" size={150} loading={loading} />
      ) : (
        <>
          {products.length ? (
            <>
              {generateCard(products)}
              <PaginationItem
                pageNum={pageNum}
                setPageNum={setPageNum}
                totalPageNum={totalPageNum}
                loading={loading}
              />
            </>
          ) : (
            <p>There are no products</p>
          )}
        </>
      )}
    </Container>
  );
}

export default HomePage;
