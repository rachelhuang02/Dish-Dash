import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Modal from '../Modal/Modal';
import axios from 'axios';
import { useUser } from '../UserContext';
import { useNavigate } from "react-router-dom";
import './SavedRecipes.css';

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const navigate = useNavigate();
  const { user } = useUser();
  const [mealDetails, setMealDetails] = useState([]);

  const fetchMealDetails = async (mealId) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
      const data = await response.json();
      return data.meals[0]; // Assuming the API returns an array of meals
    } catch (error) {
      console.error('Error fetching meal details:', error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/users/${user.username}`);
        const data = await response.json();
        const likedRecipes = data.data.likedRecipes || [];

        // Use Promise.all to fetch all meal details
        const mealDetailsPromises = likedRecipes.map(recipe => fetchMealDetails(recipe.mealId));
        const mealsData = await Promise.all(mealDetailsPromises);
        setMealDetails(mealsData);
      } catch (error) {
        console.error('Error fetching saved recipes:', error);
      }
    };

    if (user) {
      fetchSavedRecipes();
    }
  }, [user]);

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
//   const isSaved=(id) => {
//     for (let i=0;i<user.likedRecipes.length();i++){
//         if (id==user.likedRecipes[i].mealId){
//             return true;
//         }
//     }
//     return false;
//   }

  return (
    <div>
      <Header />
      <h1>Saved Recipes</h1>
      <div className="cards-container">
        {mealDetails.map((meal) => (
          <div className="card" key={meal.idMeal} onClick={() => handleMealClick(meal)}>
            <h3>{meal.strMeal}</h3>
            <div>
              <input id={`heart-${meal.idMeal}`} type="checkbox" checked={true}/>
              <label htmlFor={`heart-${meal.idMeal}`}>❤</label>
            </div>
            <img src={meal.strMealThumb} alt={meal.strMeal} className="meal-image" />
          </div>
        ))}
      </div>
      {selectedMeal && <Modal meal={selectedMeal} onClose={handleCloseModal} />}
    </div>
  );
};

export default SavedRecipes;
