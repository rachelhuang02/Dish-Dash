import React from 'react';
import './Header.css';
import { Link, useNavigate } from "react-router-dom";
import { useUser } from '../UserContext';
import Search from '../Search/Search';


const Header = () => {
  const { user, setUser } = useUser(); 
  const navigate = useNavigate(); 

  // Logout handler
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    navigate('/');
  };
  // const gotoSaved = (event) => {
  //   // Prevent the default action of the checkbox
  //   event.preventDefault();
    
  //   // Redirect to the login page
  //   window.location.href = 'http://localhost:3000/SavedRecipes';
  // };
  return (
    <header className="header">
       <Link to={`/`}><div className="brand">Dish Dive</div></Link>
       {user ? (
        <div>
         {/* <Link to={`/Search`}><div className="search">Search</div></Link> */}
         <div className="user-info">
           Welcome, {user.username}
         <button onClick={handleLogout} className="logout-button">Logout</button>
         <Link to={`/SavedRecipes`}><button className="saved">Saved Recipes</button></Link>
         </div>
        </div>
       ) : (
         <Link to={`/LogIn`}><div className="login">Log in</div></Link>
       )}
    </header>
  );
};

export default Header;
