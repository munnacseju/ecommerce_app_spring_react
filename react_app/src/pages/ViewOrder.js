import React, { useState, useEffect } from "react";
import { addOrder, updateOrder, viewOrders } from "../api/orderService";
import { Card, Button, Form } from "react-bootstrap";
import { fetchUserData, getToken } from "../api/authenticationService";

export default function ViewOrder() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    viewOrders(searchTerm) // pass searchTerm to viewOrders API call
      .then((response) => {
        if (response.status === 200) {
          const orders = response.data.orders;
          setOrders(orders);
        } else {
          alert("Something Wrong!Please Try Again 1");
        }
      })
      .catch((err) => {
        if (err && err.response) {
          switch (err.response.status) {
            case 401:
              console.log("401 status");
              alert("Authentication Failed.Bad Credentials");
              break;
            default:
              alert(
                "Something Wrong!Please Try Again 2  " + err.response.status
              );
          }
        }
      });
  }, [searchTerm]); // re-fetch orders whenever searchTerm changes

  const [data, setData] = useState();

  React.useEffect(() => {
    fetchUserData().then((response) => {
      setData(response.data);
    });
  }, []);
  function updateAOrder(order, st) {
    order.status = st;
    updateOrder(order).then((response) => {
      if (response.status === 200) {
        alert("Product updated " + order.status);
        setOrders((prevOrders) =>
          prevOrders.map((prevOrder) =>
            prevOrder.id === order.id ? order : prevOrder
          )
        );
      } else {
        alert("Something went wrong! Please try again.");
      }
    });
  }

  function useSearchOrderByOrderId(orders, searchTerm) {
    return searchTerm.trim() === ""
      ? orders
      : orders.filter((order) =>
          order.id.toString().includes(searchTerm.toString())
        );
  }
  const filteredOrders = useSearchOrderByOrderId(orders, searchTerm);

  return (
    <div className="d-flex mx-5 flex-wrap justify-content-around align-items-center">
      <Form.Group className="mt-3 mb-5">
        <h1>Enter Order ID: </h1>
        <Form.Control
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>
      {filteredOrders.map((order) => (
        <Card style={{ width: "18rem", margin: "10px" }} className="my-3 mx-3">
          <Card.Body>
            <Card.Title>Ordered Price: {order.orderedPrice}</Card.Title>
            <Card.Text>Status: {order.status}</Card.Text>
            <Card.Text>Ordered Id: {order.id}</Card.Text>
            {data &&
              data.roles &&
              data.roles.filter((value) => value.roleCode === "ADMIN").length >
                0 && (
                <>
                  <Button
                    variant="danger"
                    style={{ margin: "2px" }}
                    onClick={() => updateAOrder(order, "REGECTED")}
                  >
                    Regect
                  </Button>
                  <Button
                    variant="primary"
                    style={{ margin: "2px" }}
                    onClick={() => updateAOrder(order, "APPROVED")}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="primary"
                    style={{ margin: "2px" }}
                    onClick={() => updateAOrder(order, "DELIVERED")}
                  >
                    Deliver
                  </Button>
                </>
              )}
            {order.status === "APPROVED" ||
            order.status === "REGECTED" ||
            order.status === "CANCELLED" ||
            order.status === "DELIVERED" ? (
              <></>
            ) : (
              <>
                <Button
                  variant="danger"
                  style={{ margin: "2px" }}
                  onClick={() => updateAOrder(order, "CANCELLED")}
                >
                  Cancel
                </Button>
              </>
            )}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}
