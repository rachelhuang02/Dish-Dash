import React, { useState, useEffect, useCallback } from "react";
import Header from "../Header/Header";

const PopularRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [mealDetails, setMealDetails] = useState(null);

  // Function to fetch holidays from your API
  const fetchRecipes = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/popularRecipes');
      const data = await response.json();
      console.log('Fetched recipes:', data.data);
      setRecipes(data.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };
  
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
  
  
  const getRecipes = async () => {
    try {  
      const mealDetailsPromises = recipes.map((recipe) => fetchMealDetails(recipe.mealId));
      const mealsData = await Promise.all(mealDetailsPromises);
      // Update the state with all meal details
      setMealDetails(mealsData.map((data) => data.meals[0]));
    } catch (error) {
      console.error('Error fetching meal details:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchRecipes();
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };
      fetchData();
  }, []);

  useEffect(() => {
    getRecipes();
  }, [recipes]);

  return (
    <div>
      <Header />
      <h1>Popular Recipes</h1>
        <div className="meal-details">
          <div className="cards-container">
            {mealDetails && mealDetails.map((meal) => (
              <div className="card" key={meal.idMeal}>
                <h3>{meal.strMeal}</h3>
                <img src={meal.strMealThumb} alt={meal.strMeal} className="meal-image" />
                <p>{meal.strInstructions}</p>
              </div>
            ))}
          </div>
        </div>
    </div>
  );
};

export default PopularRecipes;
