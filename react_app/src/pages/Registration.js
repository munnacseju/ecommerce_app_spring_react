import react, { useState } from "react";
import "./loginpage.css";
import { userLogin, userRegister } from "../api/authenticationService";
import { Alert, Spinner } from "react-bootstrap";

const LoginPage = ({ loading, error, ...props }) => {
  const [values, setValues] = useState({
    userName: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();

    userRegister(values).then((response) => {
      console.log("response", response);
      if (response.status === 200) {
        props.history.push("/login");
        window.location.reload();
      } else {
        props.loginFailure("Something Wrong!Please Try Again");
      }
    });
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
                  <h4 className="card-title">Registration</h4>

                  <form
                    className="my-login-validation"
                    onSubmit={handleSubmit}
                    noValidate={false}
                  >
                    <div className="form-group">
                      <label htmlFor="email">User Name</label>
                      <input
                        id="username"
                        type="text"
                        className="form-control"
                        minLength={2}
                        value={values.userName}
                        onChange={handleChange}
                        name="userName"
                        required
                      />

                      <div className="invalid-feedback">UserId is invalid</div>
                    </div>

                    <div className="form-group">
                      <label>Password</label>
                      <input
                        id="password"
                        type="password"
                        className="form-control"
                        minLength={2}
                        value={values.password}
                        onChange={handleChange}
                        name="password"
                        required
                      />
                      <div className="invalid-feedback">
                        Password is required
                      </div>
                    </div>

                    <div className="form-group">
                      <label>First Name</label>
                      <input
                        id="firstName"
                        type="text"
                        className="form-control"
                        minLength={2}
                        value={values.firstName}
                        onChange={handleChange}
                        name="firstName"
                        required
                      />
                      <div className="invalid-feedback">
                        First Name is required
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Last Name</label>
                      <input
                        id="lastName"
                        type="text"
                        className="form-control"
                        minLength={2}
                        value={values.lastName}
                        onChange={handleChange}
                        name="lastName"
                        required
                      />
                      <div className="invalid-feedback">
                        Last Name is required
                      </div>
                    </div>
                    <div className="form-group m-0">
                      <button type="submit" className="btn btn-primary">
                        Registration
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

export default LoginPage;
