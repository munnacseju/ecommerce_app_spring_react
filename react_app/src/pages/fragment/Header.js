import React, { useState, useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { fetchUserData, getToken } from "../../api/authenticationService";

export const Header = () => {
  const data = getToken();
  const [user, setUser] = useState({});

  React.useEffect(() => {
    fetchUserData().then((response) => {
      setUser(response.data);
    });
  }, []);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">
        Ecommerce App
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {data === "" ? (
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/login">
              Login
            </Nav.Link>
            <Nav.Link as={Link} to="/registration">
              Registration
            </Nav.Link>
          </Nav>
        ) : (
          <>
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/viewproduct">
                View Products
              </Nav.Link>
              <Nav.Link as={Link} to="/vieworder">
                View Orders
              </Nav.Link>

              {user &&
                user.roles &&
                user.roles.filter((value) => value.roleCode === "ADMIN")
                  .length > 0 && (
                  <>
                    <Nav.Link as={Link} to="/addproduct">
                      Add Product
                    </Nav.Link>
                    <Nav.Link as={Link} to="/role">
                      Role Management
                    </Nav.Link>
                  </>
                )}
            </Nav>
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/profile" style={{ color: "#fff" }}>
                {user.firstName + " " + user.lastName}
              </Nav.Link>
              <Nav.Link as={Link} to="/logout">
                Logout
              </Nav.Link>
            </Nav>
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
