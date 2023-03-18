import React from "react";
import axios from "axios";

const getToken = () => {
  return localStorage.getItem("USER_KEY");
};

export const addOrder = (request) => {
  return axios({
    method: "POST",
    url: `${process.env.hostUrl || "http://localhost:8080"}/api/addOrder`,
    headers: {
      Authorization: "Bearer " + getToken(),
    },
    data: request,
  });
};

export const updateOrder = (request) => {
  return axios({
    method: "POST",
    url: `${process.env.hostUrl || "http://localhost:8080"}/api/updateOrder`,
    headers: {
      Authorization: "Bearer " + getToken(),
    },
    data: request,
  });
};

export const viewOrders = (request) => {
  return axios({
    method: "GET",
    url: `${process.env.hostUrl || "http://localhost:8080"}/api/findAllOrder`,
    headers: {
      Authorization: "Bearer " + getToken(),
    },
    data: request,
  });
};

export const deleteOrder = (id) => {
  return axios({
    method: "GET",
    url:
      `${process.env.hostUrl || "http://localhost:8080"}/api/deleteOrder/` + id,
    headers: {
      Authorization: "Bearer " + getToken(),
    },
    data: id,
  });
};
