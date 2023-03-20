import React, { useState } from "react";
import LoginPage from "./LoginPage";

const LogOut = () => {
  localStorage.setItem("USER_KEY", "");
  window.location.reload();
  return <LoginPage />;
};

export default LogOut;
