import React from "react";
import axios from "axios";
import { deleteProducts, viewProducts } from "../api/productService";
import { Button } from "react-bootstrap";

export default class PersonList extends React.Component {
  state = {
    products: [],
  };

  componentDidMount() {
    viewProducts()
      .then((response) => {
        if (response.status === 200) {
          const products = response.data.products;
          this.setState({ products });
          // props.setUser(response.data);
          //   props.history.push("/");
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
    function deleteProduct(params) {
      deleteProducts(params).then((response) => {
        if (response.status === 200) {
          alert("You have successfully deleted " + params);
        } else {
          alert("Something Wrong!Please Try Again 1");
        }
      });
    }
    const x = <div></div>;
    return (
      <ul>
        {this.state.products.map((product) => (
          <li key={product.id}>
            Product details:
            <br />
            Name: {product.productName} <br />
            Id: {product.id} <br />
            price: {product.price} <br />
            Description: {product.description}
            <Button onClick={() => deleteProduct(product.id)}>Delete</Button>
          </li>
        ))}
      </ul>
    );
  }
}
