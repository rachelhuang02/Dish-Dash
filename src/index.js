import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home/Home";
import LogIn from "./LogIn/LogIn";
import HolidayPicks from "./HolidayPicks/HolidayPicks";
import PopularRecipes from "./PopularRecipes/PopularRecipes";
import Search from "./Search/Search";
import CreateUser from "./CreateUser/CreateUser";



export default function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/Holiday" element={<HolidayPicks />} />
        <Route path="/Popular" element={<PopularRecipes />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/CreateUser" element={<CreateUser/>}/>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
