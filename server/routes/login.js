// login.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/schemas'); // Adjust the path as necessary

module.exports = function (router) {
  // Secret key for JWT
  const JWT_SECRET = 'your_jwt_secret'; // It's better to store this in an environment variable

  // Login Endpoint
  router.post('/login', async (req, res) => {
      try {
          // Extract username and password from request body
          const { username, password } = req.body;

          // Check if user exists
          const user = await User.findOne({ username });
          if (!user) {
              return res.status(401).json({ message: 'Invalid username or password' });
          }
          console.log(user);

          // Compare password with hashed password in database
          const isMatch = password == user.password;
          console.log(password, user.password, isMatch);
        //   await bcrypt.compare(password, user.password);
          if (!isMatch) {
              return res.status(401).json({ message: 'Invalid username or password' });
          }

          // Generate JWT token
          const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
              expiresIn: '1h' // Token expires in 1 hour
          });

          res.json({ message: 'Login successful', token, username: user.username  });
      } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Server error' });
      }
  });

  return router;
};
