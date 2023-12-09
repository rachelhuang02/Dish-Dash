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

  useEffect(() => {
    // Fetch saved recipes for the current user
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
  const fetchMealDetails = async (mealId) => {
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
      const data = await response.json();
      return data; // Just return the data here
    } catch (error) {
      console.error('Error fetching meal details:', error);
      throw error; // Rethrow the error to handle it in the calling function
    }
};
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
      <h1>Saved Recipes</h1>
      <div className="cards-container">
        {savedRecipes.map((meal) => (
          <div className="card" key={meal.mealId}>
            <h3 onClick={() => handleMealClick(meal)}>{meal.mealName}</h3>
            
              <div>
                <input id={`heart-${meal.mealId}`} type="checkbox" checked={true} onChange={() => handleHeartClick(meal.idMeal, meal.strMeal)}/>
                <label htmlFor={`heart-${meal.mealId}`}>❤</label>
              </div>
            
            <img src={meal.strMealThumb} alt={meal.mealName} className="meal-image" onClick={() => handleMealClick(meal)} />
          </div>
        ))}
      </div>
      {selectedMeal && <Modal meal={selectedMeal} onClose={handleCloseModal} />}
    </div>
  );
};

export default SavedRecipes;