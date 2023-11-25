import React from 'react';
import './Header.css'; // Create a separate CSS file for styling
import { Link } from "react-router-dom";


const Header = () => {
  return (
    <header className="header">
       <Link to={`/`}><div className="brand">Dish Dive</div></Link>
      <Link to={`/LogIn`}><div className="login">Log in</div></Link>
    </header>
  );
};

export default Header;
