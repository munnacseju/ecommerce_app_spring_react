import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { fetchUserData } from "../api/authenticationService";

const MainWrapper = styled.div`
  padding-top: 40px;
`;

const ProfileImage = styled.img`
  max-height: 100px;
  border-radius: 50%;
`;

const RoleWrapper = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;
`;

const RoleCode = styled.span`
  font-weight: bold;
`;

const RoleDescription = styled.span`
  margin-left: 5px;
`;

export const Profile = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchUserData().then((response) => {
      setUser(response.data);
    });
  }, []);

  return (
    <Container>
      <MainWrapper>
        <Row>
          <Col xs={12} sm={4} md={3}>
            <ProfileImage src={user.imageBase64} alt="User profile image" />
          </Col>
          <Col xs={12} sm={8} md={9}>
            <Card.Body>
              <Card.Title>
                Name: {`${user.firstName} ${user.lastName}`}
              </Card.Title>
              <Card.Text>Username: {user.userName}</Card.Text>

              {user.roles && user.roles.length > 0 && (
                <RoleWrapper>
                  <Card.Text>Authorities:</Card.Text>
                  {user.roles.map((authority) => (
                    <div key={authority.roleCode}>
                      <RoleCode>{authority.roleCode}</RoleCode>
                      <RoleDescription>
                        {authority.roleDescription}
                      </RoleDescription>
                    </div>
                  ))}
                </RoleWrapper>
              )}

              {/* <Button variant="primary">Edit Profile</Button> */}
            </Card.Body>
          </Col>
        </Row>
      </MainWrapper>
    </Container>
  );
};
