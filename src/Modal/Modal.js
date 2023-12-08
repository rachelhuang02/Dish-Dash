import React from "react";
// import Header from "../Header/Header";
import "./Modal.css";

const Modal = ({ meal, onClose }) => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];
  
      if (!ingredient || !measure) {
        break;
      }
  
      ingredients.push({ ingredient, measure });
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-inner">
            <button className="close-button" onClick={onClose}>Close</button>
            <h1 className="modal-header">{meal.strMeal}</h1>

            <div className="modal-body">
                <div className="image-container">
                    <img src={meal.strMealThumb} alt={meal.strMeal} className="modal-image" />
                </div>
                <div className="ingredients-list">
                    {ingredients.map((pair, index) => (
                    <div key={index} className="ingredient-pair">
                        <p className="ingredient">{pair.ingredient}</p>
                        <p className="measure">{pair.measure}</p>
                    </div>
                    ))}
                </div>
            </div>
            <p> {meal.strInstructions}</p>
        </div>
        </div>
    </div>
  );
};

export default Modal;
