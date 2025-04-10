"use strict";
/*
    A data access object (DAO) for managing users in the database.
    This module provides functions to interact with the user table.
*/
const express = require("express");
const router = express.Router();
const userDao = require("../dao/userDao");

// Route to get user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await userDao.getUserById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user by ID: " + error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to get user by username
router.get("/username/:username", async (req, res) => {
  try {
    const user = await userDao.getUserByUsername(req.params.username);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user by username: " + error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Export the router to be used in the main server file
module.exports = router;
