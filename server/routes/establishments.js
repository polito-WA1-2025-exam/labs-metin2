"use strict";

/* 
    Express route for managing establishments.
    This module defines the API endpoints for fetching establishments data.
*/

const express = require("express");
const router = express.Router();
const establishmentDao = require("../dao/establishmentDao");

// Route to get all establishments
router.get("/", async (req, res) => {
  try {
    const establishments = await establishmentDao.getAllEstablishments();
    res.json(establishments);
  } catch (error) {
    console.error("Error fetching establishments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
// Route to get an establishment by ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const establishment = await establishmentDao.getEstablishmentById(id);
    if (establishment) {
      res.json(establishment);
    } else {
      res.status(404).json({ error: "Establishment not found" });
    }
  } catch (error) {
    console.error("Error fetching establishment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Export the router to be used in the main server file
module.exports = router;
// This module can be imported in the main server file to use the routes defined here.
