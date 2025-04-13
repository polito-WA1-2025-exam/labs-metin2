"use strict";
/*
    Authentication routes for the application.
    This module defines the API endpoints for user authentication, including login and logout.
*/

const express = require("express");
const router = express.Router();
const passport = require("passport");

//  Route to handle user login
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.json({ message: "Login successful", user });
    });
  })(req, res, next);
});

// Route to handle user logout
router.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: "Logout failed" });
    }
    res.json({ message: "Logout successful" });
  });
});

// Route to check if we have a logged-in user
router.get("/session", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
});

// Export the router to be used in the main server file
module.exports = router;
