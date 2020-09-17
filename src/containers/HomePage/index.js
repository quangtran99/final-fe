import React, { useEffect, useState } from "react";
import { Button, CardColumns, Container, Jumbotron } from "react-bootstrap";
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

  return (
    <Container>
      <Jumbotron className="text-center">
        <h1>Sneaker Store</h1>
        <p>Post your product here.</p>
        {isAuthenticated && (
          <Link to="/product/add">
            <Button variant="primary">Write now</Button>
          </Link>
        )}
      </Jumbotron>
      {loading ? (
        <ClipLoader color="#f86c6b" size={150} loading={loading} />
      ) : (
        <>
          <PaginationItem
            pageNum={pageNum}
            setPageNum={setPageNum}
            totalPageNum={totalPageNum}
            loading={loading}
          />
          {products.length ? (
            <>
              <CardColumns>
                {products.map((product) => (
                  <ProductCard
                    product={product}
                    key={product._id}
                    handleClick={handleClickOnProduct}
                    handleBuyNow={handleBuyNow}
                  />
                ))}
              </CardColumns>
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
