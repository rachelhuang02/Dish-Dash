import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home/Home";
import LogIn from "./LogIn/LogIn";
import HolidayPicks from "./HolidayPicks/HolidayPicks";
import PopularRecipes from "./PopularRecipes/PopularRecipes";
import Search from "./Search/Search";
import CreateUser from "./CreateUser/CreateUser";
import {UserProvider} from "./UserContext";
import Header from "./Header/Header";
import SavedRecipes from "./SavedRecipes/SavedRecipes";


export default function App() {
  return (
    <UserProvider>
    
    <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/Holiday" element={<HolidayPicks />} />
        <Route path="/Popular" element={<PopularRecipes />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/CreateUser" element={<CreateUser/>}/>
        <Route path="/SavedRecipes" element={<SavedRecipes/>}/>
      </Routes>
    </BrowserRouter>
    </UserProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
