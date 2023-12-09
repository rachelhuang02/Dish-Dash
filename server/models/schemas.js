const mongoose = require('mongoose');

const { Schema } = mongoose;

// User Schema
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  likedRecipes: [{
    mealId: String,
    mealName: String
  }]
});

// Holiday Recipe Schema
const holidayRecipeSchema = new Schema({
  holidayName: {
    type: String,
    required: true
  },
  mealIds: [{
    type: String,
  }]
});

// Popular Recipe Schema
const popularRecipeSchema = new Schema({
  mealId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  savedCount: {
    type: Number,
    default: 0
  }
});

// Create models from the above schemas
const User = mongoose.model('User', userSchema);
const HolidayRecipe = mongoose.model('HolidayRecipe', holidayRecipeSchema);
const PopularRecipe = mongoose.model('PopularRecipe', popularRecipeSchema);

// Export the models
module.exports = {
  User,
  HolidayRecipe,
  PopularRecipe
};
