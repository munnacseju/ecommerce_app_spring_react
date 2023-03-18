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
