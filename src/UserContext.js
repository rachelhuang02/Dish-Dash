// UserContext.js
import React, { createContext, useContext, useState } from 'react';
import { useEffect } from 'react';

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    // Initialize user state from localStorage if available
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  
    // Update localStorage whenever the user state changes
    useEffect(() => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    }, [user]);
  
    return (
      <UserContext.Provider value={{ user, setUser }}>
        {children}
      </UserContext.Provider>
    );
  };