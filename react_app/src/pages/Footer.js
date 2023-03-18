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
      <h1>Footer Part</h1>
      <button onClick={handleViewProduct}>View Products</button>
    </div>
  );
};

export default Footer;
