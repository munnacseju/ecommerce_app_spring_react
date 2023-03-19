import React, { useState, useEffect } from "react";
import {
  deleteProducts,
  updateProducts,
  viewProducts,
} from "../../api/productService";
import { Button, Card, Form } from "react-bootstrap";
import { addOrder } from "../../api/orderService";
import { fetchUserData } from "../../api/authenticationService";
const RoleManagement = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    refreshProducts();
  }, []);

  const [data, setData] = useState();

  React.useEffect(() => {
    fetchUserData().then((response) => {
      setData(response.data);
    });
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
    if (product.qty === 0) {
      alert("Out of stock");
    } else {
      addOrder(order)
        .then((response) => {
          if (response.status === 200) {
            history.push("/vieworder");

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
                {data &&
                  data.roles &&
                  data.roles.filter((value) => value.roleCode === "ADMIN")
                    .length > 0 && (
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </Button>
                  )}

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
export default RoleManagement;
