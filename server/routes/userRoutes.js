// userRoutes.js
const {User, HolidayRecipes, PopularRecipes} = require('../models/schemas'); 
const { parseQuery, applyQueryOptions } = require('./queryUtils'); 


module.exports = function (router) {

var getUsersRoute = router.route('/users');

  // GET /api/users
  getUsersRoute.get(async function (req, res) { // Changed to async
    console.log("in Users");
    try {
      // Parse the query options
      const options = parseQuery(req.query);

      // Apply options to the query
      let query = User.find();
      console.log(query);
      query = applyQueryOptions(query, options);

      const recipes = await query.exec();
      console.log(recipes);
      res.json({ message: "OK", data: recipes });
    } catch (err) {
      res.status(500).json({ message: "Error fetching users", data: err.toString() });
    }
  });

getUsersRoute.post(async function (req, res) {
    var user = new User(req.body);

    try {
        const savedUser = await user.save();
        res.status(201).json({ message: "User successfully created", data: savedUser });
    } catch (err) {
        if (user._id) {
            await User.findByIdAndDelete(user._id); // Changed from findByIdAndRemove
        }
        res.status(500).json({ message: "Error saving user", data: err.toString() });
    }
  });


  // GET /api/users/:id
  var getUserRoute = router.route('/users/:username');
  getUserRoute.get(async function (req, res) {
    const options = parseQuery(req.query);
    let query = User.findOne({ username: req.params.username });
    query = applyQueryOptions(query, options);

    try {
      const user = await query.exec(); 
      if (!user) {
        return res.status(404).json({ message: "User not found", data: {} });
      }
      res.json({ message: "OK", data: user });
    } catch (err) {
      res.status(500).json({ message: "Error fetching user", data: err.toString() });
    }
  });

  // PUT
  var putUserRoute = router.route('/users/:username');
  putUserRoute.put(async function (req, res) {
    try {
        const userId = req.params.username;

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found", data: {} });
        }
        // Update user fields
        user.username = req.body.username || user.username;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;

        // Save the updated user
        const updatedUser = await user.save();
        res.json({ message: "User updated successfully", data: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Error updating user", data: error.toString() });
    }
});

  var likeMealRoute = router.route('/users/:username/likeMeal');
  likeMealRoute.put(async function (req, res) {
    try {
      const { username } = req.params;
      const { mealId, mealName } = req.body; // Assuming mealId and mealName are sent in the request body

      // Find the user and update their likedRecipes
      const updatedUser = await User.findOneAndUpdate(
        { username: username },
        { $addToSet: { likedRecipes: { mealId, mealName } } }, // Use $addToSet to avoid duplicates
        { new: true } // Return the updated document
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.json({ message: "Meal added to liked recipes", data: updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating user", data: error.toString() });
    }
  });

  var unlikeMealRoute = router.route('/users/:username/unlikeMeal');
unlikeMealRoute.put(async function (req, res) {
  try {
    const { username } = req.params;
    const { mealId } = req.body; // Assuming mealId is sent in the request body

    // Find the user and remove the meal from likedRecipes
    const updatedUser = await User.findOneAndUpdate(
      { username: username },
      { $pull: { likedRecipes: { mealId } } }, // Use $pull to remove the meal
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Meal removed from liked recipes", data: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user", data: error.toString() });
  }
});
    // DELETE
    var deleteUserRoute = router.route('/users/:username');
    deleteUserRoute.delete(async function (req, res) {
      try {
          const userName = req.params.username;
          
          // Find the user and their pending tasks
          const user = await User.findById(userName);
          if (!user) return res.status(404).send({ message: "User not found" });
  
          // Unassign the user's pending tasks
          const tasks = await PopularRecipes.updateMany(
              { _id: { $in: user.likedRecipes } },
              // reduce savedCount by 1
              { $inc: { savedCount: -1 } }
          );
  
          // Delete the user
          await user.remove();
  
          res.json({ message: "User deleted and tasks unassigned" });
      } catch (error) {
          res.status(500).send({ message: "Error deleting user", data: error });
      }
  });
  
  return router;
};
