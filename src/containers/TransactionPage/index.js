import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { Badge, Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import { transactionActions } from "../../redux/actions";
import PaginationItem from "../../components/PaginationItem";

const TransactionPage = () => {
  const [pageNum, setPageNum] = useState(1);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.transaction.loading);
  const order = useSelector((state) => state.transaction.order);
  const totalPageNum = useSelector((state) => state.transaction.totalPageNum);

  useEffect(() => {
    dispatch(transactionActions.ordersUserRequest(pageNum));
  }, [dispatch, pageNum]);
  console.log(order);

  return (
    <Container style={{ height: "100vh" }}>
      {loading ? (
        <ClipLoader color="#f86c6b" size={150} loading={loading} />
      ) : (
        <>
          {order?.length ? (
            <>
              <Table striped bordered hover style={{ textAlign: "center" }}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Total Price</th>
                    <th>Status</th>
                  </tr>
                </thead>
                {order.map((item) => (
                  <tbody>
                    <tr>
                      <td>{item.shipping.fullName}</td>
                      <td>{item.shipping.address}</td>
                      <td>{item.totalPrice.toLocaleString()}</td>
                      <td>
                        {item.status === "Pending" ? (
                          <Badge variant="warning">Pending</Badge>
                        ) : (
                          <Badge variant="success">Done</Badge>
                        )}
                      </td>
                    </tr>
                  </tbody>
                ))}
              </Table>
              <PaginationItem
                pageNum={pageNum}
                setPageNum={setPageNum}
                totalPageNum={totalPageNum}
                loading={loading}
              />
            </>
          ) : (
            <p style={{ height: "100vh" }}>There are no orders</p>
          )}
        </>
      )}
    </Container>
  );
};

export default TransactionPage;
