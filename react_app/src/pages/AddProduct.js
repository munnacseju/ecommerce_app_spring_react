import react, { useState } from "react";
import { connect } from "react-redux";
import { authenticate, authFailure, authSuccess } from "../redux/authActions";
import "./loginpage.css";
import { userLogin } from "../api/authenticationService";
import { postAProduct } from "../api/productService";
import { Alert, Spinner } from "react-bootstrap";

const Addproduct = ({ loading, error, ...props }) => {
  const [values, setValues] = useState({
    productName: "",
    price: "",
    description: "",
    qty: "",
    imageBase64: "",
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    postAProduct(values)
      .then((response) => {
        console.log("response", response + "klsdfjkdsfjk");
        console.log("values ", values + " jsdkf");
        if (response.status === 200) {
          alert("Successfully posted product");
          // props.setUser(response.data);
          props.history.push("/");
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
    <div className="login-page">
      <section className="h-100">
        <div className="container h-100">
          <div className="row justify-content-md-center h-100">
            <div className="card-wrapper">
              <div className="card fat">
                <div className="card-body">
                  <h4 className="card-title">Add Product</h4>

                  <form
                    className="my-login-validation"
                    onSubmit={handleSubmit}
                    noValidate={false}
                  >
                    <div className="form-group">
                      <label htmlFor="email">Product Name</label>
                      <input
                        id="productName"
                        type="text"
                        className="form-control"
                        minLength={2}
                        value={values.productName}
                        onChange={handleChange}
                        name="productName"
                        required
                      />

                      <div className="invalid-feedback">
                        product Name is invalid
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Price</label>
                      <input
                        id="text"
                        type="text"
                        className="form-control"
                        minLength={2}
                        value={values.price}
                        onChange={handleChange}
                        name="price"
                        required
                      />
                      <div className="invalid-feedback">price is required</div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Product description</label>
                      <input
                        id="description"
                        type="text"
                        className="form-control"
                        minLength={2}
                        value={values.description}
                        onChange={handleChange}
                        name="description"
                        required
                      />

                      <div className="invalid-feedback">
                        product description is invalid
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Image data</label>
                      <input
                        id="imageBase64"
                        type="text"
                        className="form-control"
                        minLength={2}
                        value={values.imageBase64}
                        onChange={handleChange}
                        name="imageBase64"
                        required
                      />

                      <div className="invalid-feedback">
                        imageBase64 is invalid
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Product Quantity</label>
                      <input
                        id="qty"
                        type="text"
                        className="form-control"
                        minLength={2}
                        value={values.qty}
                        onChange={handleChange}
                        name="qty"
                        required
                      />
                      <div className="invalid-feedback">
                        Quantity is required
                      </div>
                    </div>

                    <div className="form-group m-0">
                      <button type="submit" className="btn btn-primary">
                        Add a product
                        {loading && (
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                        )}
                      </button>
                    </div>
                  </form>
                  {error && (
                    <Alert style={{ marginTop: "20px" }} variant="danger">
                      {error}
                    </Alert>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Addproduct;
