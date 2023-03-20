import React from "react";
import axios from "axios";

export const getToken = () => {
  return localStorage.getItem("USER_KEY");
};

export const fetchAllUSer = (request) => {
  return axios({
    method: "GET",
    url: `${process.env.hostUrl || "http://localhost:8080"}/api/v1/alluser/`,
    headers: {
      Authorization: "Bearer " + getToken(),
    },
    data: request,
  });
};

export const makeAdmin = (request) => {
  return axios({
    method: "GET",
    url:
      `${process.env.hostUrl || "http://localhost:8080"}/api/v1/makeadmin/` +
      request,
    headers: {
      Authorization: "Bearer " + getToken(),
    },
    data: request,
  });
};

export const removeAdmin = (request) => {
  return axios({
    method: "GET",
    url:
      `${process.env.hostUrl || "http://localhost:8080"}/api/v1/removeadmin/` +
      request,
    headers: {
      Authorization: "Bearer " + getToken(),
    },
    data: request,
  });
};

export const userLogin = (request) => {
  return axios({
    method: "POST",
    url: `${process.env.hostUrl || "http://localhost:8080"}/api/v1/auth/login`,
    data: request,
  });
};

export const userRegister = (authRequest) => {
  return axios({
    method: "POST",
    url: `${process.env.hostUrl || "http://localhost:8080"}/api/v1/register`,
    data: authRequest,
  });
};

export const fetchUserData = (authRequest) => {
  return axios({
    method: "GET",
    url: `${
      process.env.hostUrl || "http://localhost:8080"
    }/api/v1/auth/userinfo`,
    headers: {
      Authorization: "Bearer " + getToken(),
    },
  });
};
