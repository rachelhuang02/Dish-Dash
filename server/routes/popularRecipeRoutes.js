const { User, PopularRecipe } = require("../models/schemas");
const { parseQuery, applyQueryOptions } = require("./queryUtils");
const mongoose = require('mongoose');


module.exports = function (router) {
  // GET /api/popularRecipes
  router.route("/popularRecipes").get(async (req, res) => {
    console.log("in popularRecipes");
    try {
      // Parse the query options
      const options = parseQuery(req.query);

      // Apply options to the query
      let query = PopularRecipe.find();
      console.log(query);
      query = applyQueryOptions(query, options);

      const recipes = await query.exec();
      console.log(recipes);

      res.json({ message: "OK", data: recipes });
    } catch (err) {
      res
        .status(500)
        .json({
          message: "Error fetching popular recipes",
          data: err.toString(),
        });
    }
  });

  // POST /api/popularRecipes
  router.route("/popularRecipes").post(async (req, res) => {
    console.log("in post");
  try {
    const mealId = req.body.mealId;

    if (!mealId) {
      return res.status(400).json({ message: "mealId is required in the request body" });
    }

    // Create a new PopularRecipe instance
    const popularRecipe = new PopularRecipe({
      mealId: mealId,
      savedCount: req.body.savedCount || 0
    });

    // Save the new recipe
    const savedRecipe = await popularRecipe.save();

      res
        .status(201)
        .json({
          message: "Popular recipe successfully created",
          data: savedRecipe,
        });
    } catch (err) {
      res
        .status(500)
        .json({ message: "Error saving popular recipe", data: err.toString() });
    }
  });

  // PUT /api/popularRecipes
  router.route("/popularRecipes").put(async (req, res) => {
    try {
      const mealId = req.body.mealId;
  
      // Find the popular recipe by mealId
      const recipe = await PopularRecipe.findOne({ mealId });
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found", data: {} });
      }
  
      // Update recipe fields
      recipe.savedCount = req.body.savedCount || recipe.savedCount;
  
      // Save the updated recipe
      const updatedRecipe = await recipe.save();
  
      res.json({
        message: "Popular recipe updated successfully",
        data: updatedRecipe,
      });
    } catch (err) {
      res.status(500).json({
        message: "Error updating popular recipe",
        data: err.toString(),
      });
    }
  });

  router.route('/popularRecipes').delete(async (req, res) => {
    try {
      const mealId = req.body.mealId; // This should be req.query.mealId for query parameters
  
      // Find and delete the holiday recipe by name
      const deletedRecipe = await PopularRecipe.findOneAndDelete({ mealId });
  
      if (!deletedRecipe) {
        return res.status(404).json({ message: "Recipe not found", data: {} });
      }
  
      res.json({ message: "Holiday recipe deleted successfully", data: deletedRecipe });
    } catch (err) {
      res.status(500).json({ message: "Error deleting holiday recipe", data: err.toString() });
    }
  });
  return router;
};
