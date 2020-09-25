import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { Badge, Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import PaginationItem from "../../../components/PaginationItem";
import { transactionActions } from "../../../redux/actions";

const TransactionPage = () => {
  const [pageNum, setPageNum] = useState(1);
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.transaction.loading);
  const order = useSelector((state) => state.transaction.order);
  const totalPageNum = useSelector((state) => state.transaction.totalPageNum);

  useEffect(() => {
    dispatch(transactionActions.orderRequest(pageNum));
  }, [dispatch, pageNum]);

  const handleUpdate = (id) => {
    dispatch(transactionActions.updateStatus(id));
  };

  return (
    <Container style={{ height: "100vh" }}>
      {loading ? (
        <ClipLoader color="#f86c6b" size={150} loading={loading} />
      ) : (
        <>
          {order.length ? (
            <>
              <Table striped bordered hover style={{ textAlign: "center" }}>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Total Price</th>
                    <th>Status</th>
                    <th></th>
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
                      <td>
                        {item.status === "Pending" ? (
                          <FontAwesomeIcon
                            icon={faEdit}
                            onClick={() => handleUpdate(item._id)}
                          />
                        ) : (
                          <></>
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
