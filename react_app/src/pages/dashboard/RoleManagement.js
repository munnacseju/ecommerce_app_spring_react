import React, { useState, useEffect } from "react";
import {
  deleteProducts,
  updateProducts,
  viewProducts,
} from "../../api/productService";
import { Button, Card, Form } from "react-bootstrap";
import {
  fetchAllUSer,
  fetchUserData,
  makeAdmin,
} from "../../api/authenticationService";
const RoleManagement = ({ history }) => {
  const [users, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    refreshUsers();
  }, []);

  const [data, setData] = useState();

  React.useEffect(() => {
    fetchUserData().then((response) => {
      setData(response.data);
    });
  }, []);
  function refreshUsers() {
    fetchAllUSer()
      .then((response) => {
        if (response.status === 200) {
          setProducts(response.data.users);
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

  function makeAdminUser(user) {
    makeAdmin(user.id)
      .then((response) => {
        if (response.status === 200) {
          alert("Admin made");
          refreshUsers();
        } else {
          alert("Something went wrong! Please try again.");
        }
      })
      .catch((error) => {
        alert("Something went wrong! Please try again. (error)" + error);
      });
  }
  function handleSearch(event) {
    setSearchTerm(event.target.value);
  }

  function useSearchProductsByName(users, searchTerm) {
    return searchTerm.trim() === ""
      ? users
      : users.filter((user) =>
          user.userName.toLowerCase().includes(searchTerm.toLowerCase())
        );
  }

  const filteredProducts = useSearchProductsByName(users, searchTerm);

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
        {filteredProducts.map((user) => (
          <Card
            style={{ width: "18rem", margin: "10px" }}
            className="mx-3"
            key={user.id}
          >
            <Card.Body>
              <Card.Title>User Name: {user.userName}</Card.Title>
              <Card.Text>
                Name: {user.firstName + "  " + user.lastName}
              </Card.Text>
              <Card.Text>
                authorities:
                <br />
                {user.authorities.map((authority) => (
                  <>
                    Role Code: <>{authority.roleCode}</>
                    <br />
                    Role Code: <>{authority.roleDescription}</>
                    <br />
                  </>
                ))}
              </Card.Text>{" "}
              <div className="d-flex justify-content-between">
                <Button variant="primary" onClick={() => makeAdminUser(user)}>
                  Make admin
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
