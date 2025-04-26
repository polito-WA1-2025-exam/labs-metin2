"use strict";
/* 
    Express route for managing bags.
    This module defines the API endpoints for fetching bag data.
*/
const express = require("express");
const router = express.Router();
const bagDao = require("../dao/bagDao");
const { isLoggedIn } = require("../middlewares/auth-middlewares");

// Route to get all bags
router.get("/", isLoggedIn, async (req, res) => {
  try {
    const bags = await bagDao.getAllBags();
    res.json(bags);
  } catch (error) {
    console.error("Error fetching bags:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to get a bag by ID
router.get("/:id", isLoggedIn, async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid bag ID" });
  }
  try {
    const bag = await bagDao.getBagById(id);
    if (bag) {
      res.json(bag);
    } else {
      res.status(404).json({ error: "Bag not found" });
    }
  } catch (error) {
    console.error("Error fetching bag:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// export the router to be used in the main server file
module.exports = router;
// This module can be imported in the main server file to use the routes defined here.
