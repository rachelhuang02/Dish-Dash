import React, { useState, useEffect } from "react";
import Header from "../Header/Header";
import "./Search.css";
import axios from 'axios';
import Modal from "../Modal/Modal"
import { useUser } from '../UserContext';
import { useNavigate } from "react-router-dom";


const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [areaFilter, setAreaFilter] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedMeal, setSelectedMeal] = useState(null);
    const [savedRecipes, setSavedRecipes] = useState([]);
    const { user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
      const fetchSavedRecipes = async () => {
        try {
          const response = await fetch(`http://localhost:4000/api/users/${user.username}`);
          const data = await response.json();
          console.log(data)
          setSavedRecipes(data.data.likedRecipes || []);
        } catch (error) {
          console.error('Error fetching saved recipes:', error);
        }
      };
      if (user) {
        fetchSavedRecipes();
      }
    }, [user]);

    const handleSearch = async () => {
      try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
        let filteredResults = response.data.meals;
  
        if (categoryFilter) {
          filteredResults = filteredResults.filter(meal => meal.strCategory === categoryFilter);
        }
  
        if (areaFilter) {
          filteredResults = filteredResults.filter(meal => meal.strArea === areaFilter);
        }
  
        setSearchResults(filteredResults);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    useEffect(() => {
    }, [searchResults]);
  
    const handleMealClick = (meal) => {
        setSelectedMeal(meal);
      };
    
      const handleCloseModal = () => {
        setSelectedMeal(null);
      };
      const handleHeartClick = async (mealId, mealName) => {
        // Prevent the default action of the checkbox
        if (!user){
          navigate('/login');
        }
        try {
          const response = await axios.put(`http://localhost:4000/api/users/${user.username}/likeMeal`, {
            mealId,
            mealName
          });
    
          // Handle the response, such as updating the UI or showing a confirmation
          console.log(response.data); // Log or handle the response as needed
        } catch (error) {
          console.error('Error liking meal:', error);
        }
      };
      const isSaved = (id) => {
        console.log(user)
        console.log(savedRecipes)
        if (user && savedRecipes) {
          for (let i = 0; i < savedRecipes.length; i++) {
            console.log(savedRecipes[i].mealId)
            if (savedRecipes[i].mealId === id) {
              return true;
            }
          }
        }
        return false;
      };
    return (
      <div>
        <Header />
        <h1> Find your perfect recipe </h1>
        <p> To begin, enter an ingredient or dish into the search bar, choose a category or area, or do all three! </p>
        <div className = "inputs">
        <input
          type="text"
          placeholder="Enter an ingredient or dish"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className = "searchbar"
        />
        <div className = "select-container">
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">Select Category</option>
          <option value="Beef">Beef</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Dessert">Dessert</option>
          <option value="Goat">Goat</option>
          <option value="Lamb">Lamb</option>
          <option value="Miscellaneous">Miscellaneous</option>
          <option value="Pasta">Pasta</option>
          <option value="Pork">Pork</option>
          <option value="Seafood">Seafood</option>
          <option value="Side">Side</option>
          <option value="Starter">Starter</option>
          <option value="Vegan">Vegan</option>
          <option value="Vegetarian">Vegetarian</option>
        </select>
  
        <select value={areaFilter} onChange={(e) => setAreaFilter(e.target.value)}>
          <option value="">Select Area</option>
          <option value="American">American</option>
          <option value="British">British</option>
          <option value="Canadian">Canadia</option>
          <option value="Chinese">Chinese</option>
          <option value="Croatian">Croatian</option>
          <option value="Dutch">Dutch</option>
          <option value="Egyptian">Egyptian</option>
          <option value="Filipino">Filipino</option>
          <option value="French">French</option>
          <option value="Greek">Greek</option>
          <option value="Indian">Indian</option>
          <option value="Irish">Irish</option>
          <option value="Italian">Italian</option>
          <option value="Jamaican">Jamaican</option>
          <option value="Japanese">Japanese</option>
          <option value="Kenyan">Kenyan</option>
          <option value="Malaysian">Malaysian</option>
          <option value="Mexican">Mexican</option>
          <option value="Moroccan">Moroccan</option>
          <option value="Polish">Polish</option>
          <option value="Portuguese">Portuguese</option>
          <option value="Spanish">Spanish</option>
          <option value="Thai">Thai</option>
          <option value="Tunisian">Tunisian</option>
          <option value="Turkish">Turkish</option>
          <option value="Unknown">Unknown</option>
          <option value="Unknown">Vietnamese</option>
        </select>
        </div>
        <button onClick={handleSearch}>Search</button>

        </div>
  
        <div className="results-container">
        {searchResults.map((meal) => (
          <div
            key={meal.idMeal}
            className="result"
            
          >
            <h3  onClick={() => handleMealClick(meal)}>{meal.strMeal}</h3>
            {user ? (
                  <div>
                  <input id={`heart-${meal.idMeal}`} type="checkbox"  defaultChecked={isSaved(meal.idMeal)}/>
                  {/* checked={user && user.likedRecipes.some((likedMeal) => likedMeal.mealId === meal.idMeal)} */}
                  <label htmlFor={`heart-${meal.idMeal}`}>❤</label>
                  </div>
                ) : (
                  <div>
                  <input id={`heart-${meal.idMeal}`} type="checkbox" onChange={() => handleHeartClick(meal.idMeal, meal.strMeal)}/>
                  <label htmlFor={`heart-${meal.idMeal}`}>❤</label>
                  </div>
                )}
            <img src={meal.strMealThumb} alt={meal.strMeal} className="meal-image" onClick={() => handleMealClick(meal)}/>
            <p className="meal-description">{meal.strMeal}</p>
             
          </div>
        ))}
        </div>
        {selectedMeal && (
        <Modal meal={selectedMeal} onClose={handleCloseModal} />
      )}
      </div>
    );
};

export default Search;
