import React from "react";
import { useHistory } from "react-router-dom";

const Footer = () => {
  const history = useHistory();

  const handleViewProduct = () => {
    history.push("/viewproduct");
  };

  return (
    <div
      style={{
        padding: "10px",
        margin: "5px",
        color: "#fff",
        backgroundColor: "#222",
        textAlign: "center",
      }}
    >
      <h3>@ 2023 Motiur Rahman Munna</h3>
      <p>01965412774, munna.cse.ju@gmail.com</p>
      <p></p>
    </div>
  );
};

export default Footer;
