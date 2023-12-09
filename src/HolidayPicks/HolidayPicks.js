
import Header from "../Header/Header";
import React, { useState, useEffect } from 'react';
import './HolidayPicks.css';
import Modal from "../Modal/Modal";
import { useUser } from '../UserContext';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const HolidayPicks = () => {
  const [holidays, setHolidays] = useState([]);
  const [selectedHoliday, setSelectedHoliday] = useState('');
  const [mealDetails, setMealDetails] = useState(null);
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
  // Function to fetch holidays from your API
  const fetchHolidays = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/holidayRecipes'); // Adjust the API endpoint as needed
      const text = await response.text();
      console.log(text); // Check if it's valid JSON or an error page.
      const data = JSON.parse(text);
      // const data = await response.json();
      setHolidays(data.data);
    } catch (error) {
      console.error('Error fetching holidays:', error);
    }
  };

  // Function to fetch meal details by ID from the external API
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

  // Handle selecting a holiday
  const handleHolidaySelect = async (holidayName) => {
    setSelectedHoliday(holidayName);
    // Find the selected holiday data
    const selectedHolidayData = holidays.find((holiday) => holiday.holidayName === holidayName);
    if (selectedHolidayData) {
      try {
        // Use Promise.all to wait for all meal details to be fetched
        const mealDetailsPromises = selectedHolidayData.mealIds.map(fetchMealDetails);
        const mealsData = await Promise.all(mealDetailsPromises);
        // Update the state with all meal details
        setMealDetails(mealsData.map(data => data.meals[0]));
      } catch (error) {
        console.error('Error fetching meal details:', error);
      }
    }
  };
  
  useEffect(() => {
    // Fetch holidays when the component mounts
    fetchHolidays();
  }, []);
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

  // const isSaved=(id) => {
  //   for (let i=0;i<user.likedRecipes.length();i++){
  //     console.log(user.likedRecipes[i].mealId)
  //     console.log(id)
  //       if (id==user.likedRecipes[i].mealId){
  //           return true;
  //       }
  //   }
  //   return false;
  // }
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
      <h1>Holiday Picks</h1>
      <div className="holiday-buttons">
        {holidays.map((holiday) => (
          <button
            className="holiday-button"
            key={holiday.holidayName}
            onClick={() => handleHolidaySelect(holiday.holidayName)}
          >
            {holiday.holidayName}
          </button>
        ))}
      </div>
      {selectedHoliday && (
        <div className="meal-details">
          <h2>{selectedHoliday}</h2>
          <div className="cards-container">
            {mealDetails && mealDetails.map((meal) => (
              <div className="card" key={meal.idMeal} >
                <h3  onClick={() => handleMealClick(meal)}>{meal.strMeal}</h3>
                {user ? (
                  <div>
                  <input id={`heart-${meal.idMeal}`} type="checkbox" defaultChecked={isSaved(meal.idMeal)}/>
                  {/* checked={user && user.likedRecipes.some((likedMeal) => likedMeal.mealId === meal.idMeal)} */}
                  <label htmlFor={`heart-${meal.idMeal}`}>❤</label>
                  </div>
                ) : (
                  <div>
                  <input id={`heart-${meal.idMeal}`} type="checkbox" onChange={() => handleHeartClick(meal.idMeal, meal.strMeal)}/>
                  <label htmlFor={`heart-${meal.idMeal}`}>❤</label>
                  </div>
                )}
                <img src={meal.strMealThumb} alt={meal.strMeal} className="meal-image"  onClick={() => handleMealClick(meal)}/>
              </div>
            ))}
          </div>
            {selectedMeal && (
              <Modal meal={selectedMeal} onClose={handleCloseModal} />
            )}
          </div>
      )}
    </div>
  );
};

async function close(){
  document.getElementsByClassName('modal')[0].style.display='none'
};

export default HolidayPicks;