import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  deleteProducts,
  updateProducts,
  viewProducts,
} from "../api/productService";
import { Button, Card, Form } from "react-bootstrap";
import { addOrder } from "../api/orderService";

const ViewProduct = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    refreshProducts();
  }, []);

  function refreshProducts() {
    viewProducts()
      .then((response) => {
        if (response.status === 200) {
          setProducts(response.data.products);
        } else {
          alert("Something went wrong! Please try again.");
        }
      })
      .catch((error) => {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              alert("Authentication failed: bad credentials.");
              break;
            default:
              alert("Something went wrong! Please try again.");
          }
        } else {
          alert("Something went wrong! Please try again.");
        }
      });
  }

  function handleDelete(id) {
    deleteProducts(id)
      .then((response) => {
        if (response.status === 200) {
          alert(`Product with id ${id} has been deleted successfully.`);
          refreshProducts();
        } else {
          alert("Something went wrong! Please try again.");
        }
      })
      .catch((error) => {
        alert("Something went wrong! Please try again.");
      });
  }

  function handleOrder(product) {
    const order = {
      productId: product.id,
      orderedPrice: product.price,
    };
    addOrder(order)
      .then((response) => {
        if (response.status === 200) {
          product.qty = product.qty - 1;
          updateAProduct(product);
        } else {
          alert("Something went wrong! Please try again.");
        }
      })
      .catch((error) => {
        alert("Something went wrong! Please try again.");
      });
  }

  function updateAProduct(product) {
    updateProducts(product)
      .then((response) => {
        if (response.status === 200) {
          history.push("/vieworder");
        } else {
          alert("Something went wrong! Please try again.");
        }
      })
      .catch((error) => {
        alert("Something went wrong! Please try again.");
      });
  }

  function handleSearch(event) {
    setSearchTerm(event.target.value);
  }

  function useSearchProductsByName(products, searchTerm) {
    return searchTerm.trim() === ""
      ? products
      : products.filter((product) =>
          product.productName.toLowerCase().includes(searchTerm.toLowerCase())
        );
  }

  const filteredProducts = useSearchProductsByName(products, searchTerm);

  return (
    <div>
      <Form>
        <Form.Group controlId="formSearch">
          <Form.Control
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form.Group>
      </Form>
      <div className="d-flex mx-5 my-3 flex-wrap justify-content-around align-items-center">
        {filteredProducts.map((product) => (
          <Card
            style={{ width: "18rem", margin: "10px" }}
            className="mx-3"
            key={product.id}
          >
            <img
              src={`${product.imageBase64}`}
              alt="product image"
              className="w-100"
              style={{
                maxHeight: "100px",
              }}
            />
            <Card.Body>
              <Card.Title>Name: {product.productName}</Card.Title>
              <Card.Text>Description: {product.description}</Card.Text>
              <Card.Text>Quantity: {product.qty}</Card.Text>
              <div className="d-flex justify-content-between">
                <Button
                  variant="danger"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </Button>
                <Button variant="primary" onClick={() => handleOrder(product)}>
                  Order
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default ViewProduct;
