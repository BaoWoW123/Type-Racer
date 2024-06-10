import React from "react";
import "../styles/navBar.css";

const NavBar = (props) => {
  return (
    <nav className="navBar">
      <h1>Type Racer</h1>
      <ul>
        <li>
          <a href="/">Home </a>
        </li>
        <li>
          <a href="/scores">Scores </a>
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
