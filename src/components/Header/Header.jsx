import React from "react";
import "../Header/header.css";

const Header = () => {
  return (
    <span onClick={() => window.scroll(0, 0)} className="header">
      MoviePedia
    </span>
  );
};

export default Header;
