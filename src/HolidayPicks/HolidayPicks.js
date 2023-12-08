
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
async function christmas(){
  // for (let i=0;i<8;i++){
  //   document.getElementById(i).innerHTML = "";
  // }
  let idlist=["52990","52788","52989","52988", "52803", "52835", "52844", "52794"];
  // if (holiday=='christmas'){
  //   idlist=["52990","52788","52989","52988", "52803", "52835", "52844", "52794"];
  // }
  // else if (holiday=='thanksgiving'){
  //   idlist=["52893","52910","52857","52845", "52775", "52955", "52872", "52797"];
  // }
  // else {
  //   idlist=["52955","52948","52954","52953","52816","52784","53015", "52873"];
  // }
  // console.log(idlist, holiday)
  for (let i = 0; i < document.getElementsByClassName('box').length; i++ ){
    document.getElementsByClassName('box')[i].style.display='flex'
    let link= "https://www.themealdb.com/api/json/v1/1/lookup.php?i="+idlist[i];
    console.log(link);

    let res= await fetch(link)
    .then(response => response.json());
    let df=res.meals[0];

    console.log(df.strMeal);
    let title=df.strMeal;
   
    console.log(df.strMealThumb);
    let img_src=df.strMealThumb;
    
    let x="<img src='"+img_src+"'class=image width='200px' height='300px'></img><div id=content>"+title+"<div>";
    document.getElementById(i).innerHTML = x;
    // document.getElementById(content).style.
  }
}
async function thanksgiving(){
  // for (let i=0;i<8;i++){
  //   document.getElementById(i).innerHTML = "";
  // }
  let idlist=["52893","52910","52857","52845", "52775", "52955", "52872", "52797"];
  
  for (let i = 0; i < document.getElementsByClassName('box').length; i++ ){
    document.getElementsByClassName('box')[i].style.display='flex'
    let link= "https://www.themealdb.com/api/json/v1/1/lookup.php?i="+idlist[i];
    console.log(link);

    let res= await fetch(link)
    .then(response => response.json());
    let df=res.meals[0];

    console.log(df.strMeal);
    let title=df.strMeal;
   
    console.log(df.strMealThumb);
    let img_src=df.strMealThumb;
    
    let x="<img src='"+img_src+"'class=image width='200px' height='300px'></img><div id=content><p >"+title+"</p><div>";
    document.getElementById(i).innerHTML = x;
  }
}
async function newyear(){
  // for (let i=0;i<8;i++){
  //   document.getElementById(i).innerHTML = "";
  // }
  let idlist=["52955","52948","52954","52953","52816","52784","53015", "52873"];
  for (let i = 0; i < document.getElementsByClassName('box').length; i++ ){
    document.getElementsByClassName('box')[i].style.display='flex'
    let link= "https://www.themealdb.com/api/json/v1/1/lookup.php?i="+idlist[i];
    console.log(link);

    let res= await fetch(link)
    .then(response => response.json());
    let df=res.meals[0];

    console.log(df.strMeal);
    let title=df.strMeal;
   
    console.log(df.strMealThumb);
    let img_src=df.strMealThumb;
    
    let x="<img src='"+img_src+"'class=image width='200px' height='300px'></img><div id=content><p >"+title+"</p><div>";
    document.getElementById(i).innerHTML = x;
  }
}
export default HolidayPicks;

// Thanksgiving
// {
//   "strMeal": "Apple & Blackberry Crumble",
//   "strMealThumb": "https://www.themealdb.com/images/media/meals/xvsurr1511719182.jpg",
//   "idMeal": "52893"
// },
// {
//   "strMeal": "Chinon Apple Tarts",
//   "strMealThumb": "https://www.themealdb.com/images/media/meals/qtqwwu1511792650.jpg",
//   "idMeal": "52910"
// },
// {
//   "strMeal": "Pumpkin Pie",
//   "strMealThumb": "https://www.themealdb.com/images/media/meals/usuqtp1511385394.jpg",
//   "idMeal": "52857"
// },
// {
//   "strMeal": "Turkey Meatloaf",
//   "strMealThumb": "https://www.themealdb.com/images/media/meals/ypuxtw1511297463.jpg",
//   "idMeal": "52845"
// }
// {
//   "strMeal": "Vegan Lasagna",
//   "strMealThumb": "https://www.themealdb.com/images/media/meals/rvxxuy1468312893.jpg",
//   "idMeal": "52775"
// }
// {
//   "strMeal": "Egg Drop Soup",
//   "strMealThumb": "https://www.themealdb.com/images/media/meals/1529446137.jpg",
//   "idMeal": "52955"
// },
// {
//   "strMeal": "Spanish Tortilla",
//   "strMealThumb": "https://www.themealdb.com/images/media/meals/quuxsx1511476154.jpg",
//   "idMeal": "52872"
// },
// {
//   "strMeal": "Spicy North African Potato Salad",
//   "strMealThumb": "https://www.themealdb.com/images/media/meals/urtwux1486983078.jpg",
//   "idMeal": "52797"
// },



//Christmas
// {
//   "strMeal": "Christmas cake",
//   "strMealThumb": "https://www.themealdb.com/images/media/meals/ldnrm91576791881.jpg",
//   "idMeal": "52990"
// },
// {
//   "strMeal": "Christmas Pudding Flapjack",
//   "strMealThumb": "https://www.themealdb.com/images/media/meals/vvusxs1483907034.jpg",
//   "idMeal": "52788"
// },
// {
//   "strMeal": "Christmas Pudding Trifle",
//   "strMealThumb": "https://www.themealdb.com/images/media/meals/r33cud1576791081.jpg",
//   "idMeal": "52989"
// },
// {
//   "strMeal": "Classic Christmas pudding",
//   "strMealThumb": "https://www.themealdb.com/images/media/meals/1d85821576790598.jpg",
//   "idMeal": "52988"
// },
// {
//   "strMeal": "Beef Wellington",
//   "strMealThumb": "https://www.themealdb.com/images/media/meals/vvpprx1487325699.jpg",
//   "idMeal": "52803"
// },
// {
//   "strMeal": "Fettucine alfredo",
//   "strMealThumb": "https://www.themealdb.com/images/media/meals/uquqtu1511178042.jpg",
//   "idMeal": "52835"
// },
// "strMeal": "Lasagne",
// "strMealThumb": "https://www.themealdb.com/images/media/meals/wtsvxx1511296896.jpg",
// "idMeal": "52844"
// },
// {
//   "strMeal": "Vegan Chocolate Cake",
//   "strMealThumb": "https://www.themealdb.com/images/media/meals/qxutws1486978099.jpg",
//   "idMeal": "52794"
// },

//New year
//{
//   "strMeal": "Egg Drop Soup",
//   "strMealThumb": "https://www.themealdb.com/images/media/meals/1529446137.jpg",
//   "idMeal": "52955"
// },
// {
//   "strMeal": "Wontons",
//   "strMealThumb": "https://www.themealdb.com/images/media/meals/1525876468.jpg",
//   "idMeal": "52948"
// }
// {
//   "strMeal": "Hot and Sour Soup",
//   "strMealThumb": "https://www.themealdb.com/images/media/meals/1529445893.jpg",
//   "idMeal": "52954"
// },
// {
//   "strMeal": "Shrimp Chow Fun",
//   "strMealThumb": "https://www.themealdb.com/images/media/meals/1529445434.jpg",
//   "idMeal": "52953"
// },
// {
//   "strMeal": "Roasted Eggplant With Tahini, Pine Nuts, and Lentils",
//   "strMealThumb": "https://www.themealdb.com/images/media/meals/ysqrus1487425681.jpg",
//   "idMeal": "52816"
// },
// {
//   "strMeal": "Smoky Lentil Chili with Squash",
//   "strMealThumb": "https://www.themealdb.com/images/media/meals/uwxqwy1483389553.jpg",
//   "idMeal": "52784"
// // },
// {
//   "strMeal": "Beef Dumpling Stew",
//   "strMealThumb": "https://www.themealdb.com/images/media/meals/uyqrrv1511553350.jpg",
//   "idMeal": "52873"
// },
// {
//   "strMeal": "Krispy Kreme Donut",
//   "strMealThumb": "https://www.themealdb.com/images/media/meals/4i5cnx1587672171.jpg",
//   "idMeal": "53015"
// },