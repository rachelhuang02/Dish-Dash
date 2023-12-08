
import Header from "../Header/Header";
import React, { useState, useEffect } from 'react';
import './HolidayPicks.css';

const HolidayPicks = () => {
  const [holidays, setHolidays] = useState([]);
  const [selectedHoliday, setSelectedHoliday] = useState('');
  const [mealDetails, setMealDetails] = useState(null);

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
              <div className="card" key={meal.idMeal}>
                <h3>{meal.strMeal}</h3>
                <img src={meal.strMealThumb} alt={meal.strMeal} className="meal-image" />
                <p>{meal.strInstructions}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HolidayPicks;
