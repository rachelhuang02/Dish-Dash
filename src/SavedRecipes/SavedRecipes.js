import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import Modal from '../Modal/Modal';
import { useUser } from '../UserContext';
import './SavedRecipes.css';

const SavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    // Fetch saved recipes for the current user
    const fetchSavedRecipes = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/users/${user.username}`);
        const data = await response.json();
        setSavedRecipes(data.data.likedRecipes || []);
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

  return (
    <div>
      <h1>Saved Recipes</h1>
      <div className="cards-container">
        {savedRecipes.map((meal) => (
          <div className="card" key={meal.idMeal}>
            <h3 onClick={() => handleMealClick(meal)}>{meal.strMeal}</h3>
            
              <div>
                <input id={`heart-${meal.idMeal}`} type="checkbox" />
                <label htmlFor={`heart-${meal.idMeal}`}>❤</label>
              </div>
            
            <img src={meal.strMealThumb} alt={meal.strMeal} className="meal-image" onClick={() => handleMealClick(meal)} />
          </div>
        ))}
      </div>
      {selectedMeal && <Modal meal={selectedMeal} onClose={handleCloseModal} />}
    </div>
  );
};

export default SavedRecipes;