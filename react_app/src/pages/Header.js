import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getToken } from "../api/authenticationService";

class Header extends React.Component {
  render() {
    const data = getToken();

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
                <Nav.Link as={Link} to="/addproduct">
                  Add Product
                </Nav.Link>
              </Nav>
              <Nav className="ml-auto">
                <Nav.Link as={Link} to="/logout">
                  Logout
                </Nav.Link>
              </Nav>
            </>
          )}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
