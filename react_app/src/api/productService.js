import React from "react";
import axios from "axios";

const getToken = () => {
  return localStorage.getItem("USER_KEY");
};

export const postAProduct = (authRequest) => {
  return axios({
    method: "POST",
    url: `${process.env.hostUrl || "http://localhost:8080"}/api/addProduct`,
    headers: {
      Authorization: "Bearer " + getToken(),
    },
    data: authRequest,
  });
};

export const viewProducts = (request) => {
  return axios({
    method: "GET",
    url: `${
      process.env.hostUrl || "http://localhost:8080"
    }/api/findAllProducts`,
    headers: {
      Authorization: "Bearer " + getToken(),
    },
    data: request,
  });
};

export const updateProducts = (request) => {
  return axios({
    method: "POST",
    url: `${process.env.hostUrl || "http://localhost:8080"}/api/updateProduct`,
    headers: {
      Authorization: "Bearer " + getToken(),
    },
    data: request,
  });
};

export const deleteProducts = (params) => {
  return axios({
    method: "GET",
    url:
      `${process.env.hostUrl || "http://localhost:8080"}/api/deleteProduct/` +
      params,
    headers: {
      Authorization: "Bearer " + getToken(),
    },
    data: params,
  });
};
