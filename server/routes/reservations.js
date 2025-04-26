"use strict";
/* 
    Express route for managing reservations.
    This module defines the API endpoints for fetching reservation data.
*/
const express = require("express");
const router = express.Router();
const reservationDao = require("../dao/reservationDao");
const bagDao = require("../dao/bagDao");
const { isLoggedIn } = require("../middlewares/auth-middlewares");

// Route to create a new reservation
router.post("/", isLoggedIn, async (req, res) => {
  const reservation = req.body;
  try {
    const reservationId = await reservationDao.createReservation(reservation);
    const updateBagStatusRow = await bagDao.updateBagStatus(
      reservation.bagID,
      reservation.status
    );
    console.log(updateBagStatusRow);
    res.status(201).json({ id: reservationId });
  } catch (error) {
    console.error("Error creating reservation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to delete a reservation by bag ID
router.delete("/bags/:bagID/reservations", isLoggedIn, async (req, res) => {
  const bagID = req.params.bagID;
  try {
    const changes = await reservationDao.deleteReservationByBagId(bagID);
    if (changes > 0) {
      res.status(200).json({
        message: "reservation deleted sucessfully",
        bagID: bagID,
        deleteCount: changes,
      });
    } else {
      res
        .status(404)
        .json({ error: "Reservation not found", "changes number": changes });
    }
  } catch (error) {
    console.error("Error deleting reservation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to get reservations by bag ID
router.get("/bags/:bagID/reservations", isLoggedIn, async (req, res) => {
  const bagID = req.params.bagID;
  try {
    const reservations = await reservationDao.getReservationsByBagId(bagID);
    if (reservations.length > 0) {
      res.json(reservations);
    } else {
      res.status(404).json({ error: "No reservations found for this bag" });
    }
  } catch (error) {
    console.error("Error fetching reservations:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to get reservations by user ID
router.get("/users/:userID/reservations", isLoggedIn, async (req, res) => {
  const userID = req.params.userID;
  try {
    const reservations = await reservationDao.getReservationsByUserId(userID);
    if (reservations.length > 0) {
      res.json(reservations);
    } else {
      res.status(404).json({ error: "No reservations found for this user" });
    }
  } catch (error) {
    console.error("Error fetching reservations:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Export the router to be used in the main server file
module.exports = router;
// This module can be imported in the main server file to use the routes defined here.
