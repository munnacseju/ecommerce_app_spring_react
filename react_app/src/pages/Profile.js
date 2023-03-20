import React, { useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { fetchUserData } from "../api/authenticationService";

const MainWrapper = styled.div`
  padding-top: 40px;
`;

export const Profile = () => {
  const [user, setUser] = useState({});

  React.useEffect(() => {
    fetchUserData().then((response) => {
      setUser(response.data);
    });
  }, []);

  return (
    <Container>
      <MainWrapper>
        <Card.Body>
          <img
            src={`${user.imageBase64}`}
            alt="User profile image"
            className="w-100"
            style={{
              maxHeight: "100px",
            }}
          />
          <div>{console.log(user.imageBase64 + " image")}</div>
          <Card.Title>Name: {user.firstName + "  " + user.lastName}</Card.Title>
          <Card.Text>
            authorities:
            <br />
            {user &&
              user.roles &&
              user.roles.map((authority) => (
                <>
                  Role Code: <>{authority.roleCode}</>
                  <br />
                  Role Description: <>{authority.roleDescription}</>
                  <br />
                </>
              ))}
          </Card.Text>
        </Card.Body>
      </MainWrapper>
    </Container>
  );
};
