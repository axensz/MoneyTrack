import React from "react";
import logoMonogram from "../assets/logoMonogram.svg";
import "../styles/header.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logoMonogram} alt="Logo Monogram" className="logoMonogram" />
      </div>
    </header>
  );
};

export default Header;
