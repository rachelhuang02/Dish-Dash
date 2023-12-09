// SavedRecipes.js
import React, { useState, useEffect } from 'react';
import './SavedRecipes.css';
import Modal from '../Modal/Modal'; // Import the Modal component
import { useUser } from '../UserContext';

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]); // Add state for saved recipes
  const [selectedMeal, setSelectedMeal] = useState(null);
  const { user } = useUser(); 

  // Fetch saved recipes (replace this with your logic to fetch saved recipes)
  useEffect(() => {
    // Example: Fetch saved recipes from an API endpoint
    const fetchSavedRecipes = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/savedRecipes'); // Adjust the API endpoint
        const data = await response.json();
        setSavedRecipes(data.data);
      } catch (error) {
        console.error('Error fetching saved recipes:', error);
      }
    };

    fetchSavedRecipes();
  }, []);

  const handleMealClick = (meal) => {
    setSelectedMeal(meal);
  };

  const handleCloseModal = () => {
    setSelectedMeal(null);
  };

  return (
    <div>
      <h1>Saved Recipes</h1>
      <div className="cards-container">
        {savedRecipes.map((meal) => (
          <div className="card" key={meal.idMeal}>
            <h3 onClick={() => handleMealClick(meal)}>{meal.strMeal}</h3>
            {user ? (
              <div>
                <input id={`heart-${meal.idMeal}`} type="checkbox" />
                <label htmlFor={`heart-${meal.idMeal}`}>❤</label>
              </div>
            ) : (
              <div>
                <input id={`heart-${meal.idMeal}`} type="checkbox" onChange={handleHeartClick} />
                <label htmlFor={`heart-${meal.idMeal}`}>❤</label>
              </div>
            )}
            <img src={meal.strMealThumb} alt={meal.strMeal} className="meal-image" onClick={() => handleMealClick(meal)} />
          </div>
        ))}
      </div>
      {selectedMeal && <Modal meal={selectedMeal} onClose={handleCloseModal} />}
    </div>
  );
};

export default SavedRecipes;