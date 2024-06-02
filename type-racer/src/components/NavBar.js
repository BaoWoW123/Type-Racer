import React from "react";
import "../styles/home.css";

const NavBar = (props) => {
  return (
    <nav className="navBar">
      <ul>
        <li>
          <a href="/">Home </a>
        </li>
        <li>
          <a href="/profile">Profile </a>
        </li>
        <li>
          <a href="/settings">Settings </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
