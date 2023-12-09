import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import "./Home.css";
import search from "./search_icon.png";
import holiday from "./holiday.png";
import thumb from "./thumb.png";
// import 'normalize.css/normalize.css';

const Home = () => {
  return (
    <div>
      <Header />
      <div className="content-section">
        <div className="background-image"></div>
        <div className="overlay-container">
          <h2>Your Meal Finder</h2>
          <p className = "paragraph-text">
            Welcome to Dish Dive! We are so glad you have come to us for your
            cooking journey! Checkout some popular recipes below or log in to
            start searching for recipes.
          </p>
        </div>
        <div className="card-container">
          <div className="card">
          <Link to={`/Search`}>
            <img src = {search} className = "home_image"/>
            Find Your Recipe 
          </Link>
          </div>
        
          <div className="card">
          <Link to={`/Holiday`}>
            <img src = {holiday} className = "home_image"/>
            Holiday Picks 
          </Link>
          </div>
          <div className="card">
          <Link to={`/Popular`}>
            <img src = {thumb} className = "home_image"/>
            Popular Recipes
          </Link> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
