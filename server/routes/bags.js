"use strict";
/* 
    Express route for managing bags.
    This module defines the API endpoints for fetching bag data.
*/
const express = require("express");
const router = express.Router();
const bagDao = require("../dao/bagDao");

// Route to get all bags
router.get("/", async (req, res) => {
  try {
    const bags = await bagDao.getAllBags();
    res.json(bags);
  } catch (error) {
    console.error("Error fetching bags:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to get a bag by ID
router.get("/:id", async (req, res) => {
  const id = req.params.id;
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
