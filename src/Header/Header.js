import React, { useState } from 'react';
import './Header.css';
import { Link, useNavigate } from "react-router-dom";
import { useUser } from '../UserContext';

const Header = () => {
  const { user, setUser } = useUser(); 
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  // Logout handler
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <header className="header">
       <Link to={`/`}><div className="brand">Dish Dive</div></Link>
       <div className="right-section">
         {user ? (
           <>
             <Link to={`/Search`}><div className="menu-item">Find Recipe</div></Link>
             <Link to={`/SavedRecipes`}><div className="menu-item">My Recipes</div></Link>
             <div className="user-menu" onClick={() => setShowDropdown(!showDropdown)}>
               <span className="username">{user.username}</span>
               <span className="arrow-down"></span>
               {showDropdown && (
                 <div className="dropdown-menu">
                   <button onClick={handleLogout} className="dropdown-item">Logout</button>
                 </div>
               )}
             </div>
           </>
         ) : (
           <Link to={`/LogIn`}><div className="login">Log in</div></Link>
         )}
       </div>
    </header>
  );
};

export default Header;
