// holidayRecipeRoutes.js
const {     User, HolidayRecipe, PopularRecipe } = require('../models/schemas');
const { parseQuery, applyQueryOptions } = require('./queryUtils');

module.exports = function (router) {
  // GET /api/holidayRecipes
  router.route('/holidayRecipes').get(async (req, res) => {
    console.log("in holidayRecipes");
    try {
      // Parse the query options
      const options = parseQuery(req.query);

      // Apply options to the query
      let query = HolidayRecipe.find();
      console.log(query);
      query = applyQueryOptions(query, options);

      const recipes = await query.exec();
      console.log(recipes);
      res.json({ message: "OK", data: recipes });
    } catch (err) {
      res.status(500).json({ message: "Error fetching holiday recipes", data: err.toString() });
    }
  });

  // POST /api/holidayRecipes
  router.route('/holidayRecipes').post(async (req, res) => {
    try {
      const holidayRecipe = new HolidayRecipe(req.body);

      const savedRecipe = await holidayRecipe.save();

      res.status(201).json({ message: "Holiday recipe successfully created", data: savedRecipe });
    } catch (err) {
      res.status(500).json({ message: "Error saving holiday recipe", data: err.toString() });
    }
  });

  // GET /api/holidayRecipes/:holidayName
  router.route('/holidayRecipes/:holidayName').get(async (req, res) => {
    try {
      const holidayName = req.params.holidayName;
      const options = parseQuery(req.query);

      let query = HolidayRecipe.findOne({ holidayName });
      query = applyQueryOptions(query, options);

      const recipe = await query.exec();

      if (!recipe) {
        return res.status(404).json({ message: "Holiday recipe not found", data: {} });
      }

      res.json({ message: "OK", data: recipe });
    } catch (err) {
      res.status(500).json({ message: "Error fetching holiday recipe", data: err.toString() });
    }
  });

  // PUT /api/holidayRecipes/:holidayName
  router.route('/holidayRecipes/:holidayName').put(async (req, res) => {
    try {
      const holidayName = req.params.holidayName;

      // Find the holiday recipe by name
      const recipe = await HolidayRecipe.findOne({ holidayName });
      if (!recipe) {
        return res.status(404).json({ message: "Holiday recipe not found", data: {} });
      }

      // Update recipe fields
      recipe.holidayName = req.body.holidayName || recipe.holidayName;
      recipe.mealIds = req.body.mealIds || recipe.mealIds;

      // Save the updated recipe
      const updatedRecipe = await recipe.save();

      res.json({ message: "Holiday recipe updated successfully", data: updatedRecipe });
    } catch (err) {
      res.status(500).json({ message: "Error updating holiday recipe", data: err.toString() });
    }
  });

  // DELETE /api/holidayRecipes/:holidayName
  router.route('/holidayRecipes/:holidayName').delete(async (req, res) => {
    try {
      const holidayName = req.params.holidayName;

      // Find and delete the holiday recipe by name
      const deletedRecipe = await HolidayRecipe.findOneAndDelete({ holidayName });

      if (!deletedRecipe) {
        return res.status(404).json({ message: "Holiday recipe not found", data: {} });
      }

      res.json({ message: "Holiday recipe deleted successfully", data: deletedRecipe });
    } catch (err) {
      res.status(500).json({ message: "Error deleting holiday recipe", data: err.toString() });
    }
  });

  return router;
};
