import react, { useState } from "react";
import { connect } from "react-redux";
import { authenticate, authFailure, authSuccess } from "../redux/authActions";
import "./loginpage.css";
import { userLogin } from "../api/authenticationService";
import { postAProduct } from "../api/postService";
import { Alert, Spinner } from "react-bootstrap";

const Addpost = ({ loading, error, ...props }) => {
  const [values, setValues] = useState({
    productName: "",
    price: "",
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
          props.history.push("/dashboard");
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
                  <h4 className="card-title">Add Post</h4>

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

                    <div className="form-group m-0">
                      <button type="submit" className="btn btn-primary">
                        Add a post
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

// const mapStateToProps = ({ auth }) => {
//   console.log("state ", auth);
//   return {
//     loading: auth.loading,
//     error: auth.error,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     authenticate: () => dispatch(authenticate()),
//     setUser: (data) => dispatch(authSuccess(data)),
//     loginFailure: (message) => dispatch(authFailure(message)),
//   };
// };

export default connect()(Addpost);
