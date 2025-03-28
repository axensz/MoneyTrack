import React from "react";
import "../styles/header.scss";

import logoMonogram from "../assets/logoMonogram.svg";


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
