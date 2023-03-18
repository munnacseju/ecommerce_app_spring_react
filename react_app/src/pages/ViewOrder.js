import React from "react";
import { addOrder, viewOrders } from "../api/orderService";
import { Card, Button, Col, Row } from "react-bootstrap";

export default class ViewOrder extends React.Component {
  state = {
    orders: [],
  };

  componentDidMount() {
    viewOrders()
      .then((response) => {
        if (response.status === 200) {
          const orders = response.data.orders;
          this.setState({ orders });
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
  }

  render() {
    // function deleteProduct(params) {
    //   deleteProducts(params).then((response) => {
    //     if (response.status === 200) {
    //       alert("You have successfully deleted " + params);
    //     } else {
    //       alert("Something Wrong!Please Try Again 1");
    //     }
    //   });
    // }
    //}
    return (
      <div className="d-flex mx-5 flex-wrap justify-content-around align-items-center">
        {this.state.orders.map((order) => (
          <Card
            style={{ width: "18rem", margin: "10px" }}
            className="my-3 mx-3"
          >
            <Card.Body>
              <Card.Title>Ordered Price: {order.orderedPrice}</Card.Title>
              <Card.Text>Status: {order.status}</Card.Text>
              <Card.Text>Ordered Id: {order.id}</Card.Text>
              {/* <Button
                variant="danger"
                style={{ margin: "2px" }}
                onClick={() => deleteProduct(order.id)}
              >
                Delete
              </Button> */}
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  }
}
