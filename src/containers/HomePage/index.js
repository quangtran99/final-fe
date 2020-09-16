import React, { useEffect } from "react";
import { CardColumns, Container, Jumbotron } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import BlogCard from "../../components/BlogCard";
import { blogActions } from "../../redux/actions";

function HomePage() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.blog.loading);
  const blogs = useSelector((state) => state.blog.blogs);

  useEffect(() => {
    dispatch(blogActions.blogsRequest());
  }, [dispatch]);
  return (
    <Container>
      <Jumbotron className="text-center">
        <h1>Social Blog</h1>
        <p>Write about your amazing experiences.</p>
      </Jumbotron>
      {loading ? (
        <ClipLoader color="#f86c6b" size={150} loading={loading} />
      ) : (
        <>
          {blogs.length ? (
            <>
              <CardColumns>
                {blogs.map((blog) => (
                  <BlogCard blog={blog} key={blog._id} />
                ))}
              </CardColumns>
            </>
          ) : (
            <p>There are no blogs</p>
          )}
        </>
      )}
    </Container>
  );
}

export default HomePage;
