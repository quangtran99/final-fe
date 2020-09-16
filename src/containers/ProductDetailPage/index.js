import React, { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../../redux/actions";
import { Button } from "react-bootstrap";
import { ClipLoader } from "react-spinners";
import Moment from "react-moment";
import Markdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProductDetailPage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.selectedProduct);
  const loading = useSelector((state) => state.product.loading);
  const currentUser = useSelector((state) => state.auth.user);
//   const submitLoading = useSelector((state) => state.product.subReviewLoading);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const history = useHistory();

//   const [reviewText, setReviewText] = useState("");
//   const handleInputChange = (e) => {
//     setReviewText(e.target.value);
//   };
//   const handleSubmitReview = (e) => {
//     e.preventDefault();
//     dispatch(productActions.createReview(blog._id, reviewText));
//     setReviewText("");
//   };

  useEffect(() => {
    if (params?.id) {
      dispatch(productActions.getSingleProduct(params.id));
    }
  }, [dispatch, params]);

  const handleGoBackClick = (e) => {
    history.goBack();
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <Button onClick={handleGoBackClick}>
          <FontAwesomeIcon icon="chevron-left" size="1x" /> Back
        </Button>
        {currentUser?._id === product?.author?._id ? (
          <Link to={`/product/edit/${product._id}`}>
            <Button variant="primary">
              <FontAwesomeIcon icon="edit" size="1x" /> Edit
            </Button>
          </Link>
        ) : (
          <></>
        )}
      </div>
      {loading ? (
        <ClipLoader color="#f86c6b" size={150} loading={loading} />
      ) : (
        <>
          {product && (
            <div className="mb-5">
              <h4>{product.title}</h4>

              <span className="text-muted">
                @{product?.author?.name} wrote{" "}
                <Moment fromNow>{product.createdAt}</Moment>
              </span>

              <hr />
              <Markdown source={product.content} />
              <hr />
              {/* <Reactions
                reactionsData={product.reactions}
                targetType="Product"
                target={product._id}
                size="lg"
              /> */}
              <hr />
              {/* <ReviewList reviews={product.reviews} /> */}
            </div>
          )}

          {/* {isAuthenticated && (
            <ReviewBlog
              reviewText={reviewText}
              handleInputChange={handleInputChange}
              handleSubmitReview={handleSubmitReview}
              loading={submitLoading}
            />
          )} */}
        </>
      )}
    </>
  );
};

export default ProductDetailPage;