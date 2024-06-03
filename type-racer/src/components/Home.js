import React from "react";
import NavBar from "./NavBar";
import TextPrompt from "./TextPrompt"
import "../styles/home.css";
const Home = () => {
  return (
    <div className="Home">
      <NavBar></NavBar>
      <div className="textExample">
        <TextPrompt></TextPrompt>
      </div>
    </div>
  );
};

export default Home;
