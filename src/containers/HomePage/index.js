import React, { useEffect } from "react";
import { CardColumns, Container, Jumbotron } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import ProductCard from "../../components/ProductCard";
import { productActions } from "../../redux/actions";

function HomePage() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.product.loading);
  const products = useSelector((state) => state.product.products);

  useEffect(() => {
    dispatch(productActions.productsRequest());
  }, [dispatch]);
  return (
    <Container>
      <Jumbotron className="text-center">
        <h1>Sneaker Store</h1>
        <p>Write about your amazing experiences.</p>
      </Jumbotron>
      {loading ? (
        <ClipLoader color="#f86c6b" size={150} loading={loading} />
      ) : (
        <>
          {products.length ? (
            <>
              <CardColumns>
                {products.map((product) => (
                  <ProductCard product={product} key={product._id} />
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
