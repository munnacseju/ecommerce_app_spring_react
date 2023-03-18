import React from "react";
import axios from "axios";
import { viewProducts } from "../api/productService";

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
          </li>
        ))}
      </ul>
    );
  }
}
