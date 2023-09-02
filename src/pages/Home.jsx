import React from 'react';
import "../styles/Home.css";
import bgImage from "../assets/bg.png";
const Home = () => {
  return (
    <div>
      <div className="home">
        <img srcSet={bgImage} alt="bitcoin Image" />
      </div>
    </div>
  )
}

export default Home