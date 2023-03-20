import react, { useState } from "react";
import { postAProduct } from "../api/productService";
import { Button, Card, Form, Spinner, Alert } from "react-bootstrap";

const Addproduct = ({ loading, error, ...props }) => {
  const [values, setValues] = useState({
    productName: "",
    price: "",
    description: "",
    qty: "",
    imageBase64: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setValues((values) => ({
        ...values,
        imageBase64: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    postAProduct(values)
      .then((response) => {
        if (response.status === 200) {
          alert("Successfully posted product");
          // props.setUser(response.data);
          props.history.push("/viewproduct");
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
    //console.log("Loading again",loading);
  };

  const handleChange = (e) => {
    e.persist();
    setValues((values) => ({
      ...values,
      [e.target.name]: e.target.value,
    }));
  };

  console.log("Loading ", loading);

  return (
    <div className="my-3">
      <section className="h-100">
        <div className="container h-100 w-100">
          <div className="justify-content-md-center h-100">
            <div className="card-wrapper">
              <Card className="fat">
                <Card.Body>
                  <Card.Title className="h1 text-primary">
                    Add Product
                  </Card.Title>
                  <Form
                    className="my-login-validation"
                    onSubmit={handleSubmit}
                    noValidate={false}
                  >
                    <Form.Group>
                      <Form.Label>Product Name</Form.Label>
                      <Form.Control
                        id="productName"
                        type="text"
                        minLength={2}
                        value={values.productName}
                        onChange={handleChange}
                        name="productName"
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Product Name is invalid
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        id="text"
                        type="number"
                        minLength={2}
                        value={values.price}
                        onChange={handleChange}
                        name="price"
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Price is required
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Product Description</Form.Label>
                      <Form.Control
                        id="description"
                        type="text"
                        minLength={2}
                        value={values.description}
                        onChange={handleChange}
                        name="description"
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Product description is invalid
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Upload an Image</Form.Label>
                      <Form.File
                        id="imageBase64"
                        name="imageBase64"
                        onChange={handleImageChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Image data is invalid
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label>Product Quantity</Form.Label>
                      <Form.Control
                        id="qty"
                        type="number"
                        minLength={2}
                        value={values.qty}
                        onChange={handleChange}
                        name="qty"
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Quantity is required
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Button
                      type="submit"
                      variant="primary"
                      disabled={loading}
                      className="mb-3"
                    >
                      Add a Product
                      {loading && (
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="ml-1"
                        />
                      )}
                    </Button>
                  </Form>

                  {error && (
                    <Alert style={{ marginTop: "20px" }} variant="danger">
                      {error}
                    </Alert>
                  )}
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Addproduct;
