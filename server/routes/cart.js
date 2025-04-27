"use strict";
/* 
    Express route for managing shopping cart.
    This module defines the API endpoints for fetching shoppingCarts data.
*/
const express = require("express");
const router = express.Router();
const cartDao = require("../dao/cartDao");
const bagDao = require("../dao/bagDao");
const reservationDao = require("../dao/reservationDao");
const db = require("../dao/db");
const { isLoggedIn } = require("../middlewares/auth-middlewares");

// Route to add a item for a user in shoppingCarts table and update status of the bag to "in-cart" in bag table
router.post("/:userID/:bagID", isLoggedIn, async (req, res) => {
  const userID = req.params.userID;
  const bagID = req.params.bagID;
  try {
    const resInfo = await cartDao.addItemToCart(userID, bagID);
    const status = "in-cart";
    const updateBagStatusInfo = await bagDao.updateBagStatus(bagID, status);
    console.log(updateBagStatusInfo);
    res.status(201).json({ resInfo: resInfo });
  } catch (error) {
    console.error("Error add a item for a user in shopping cart: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to remove a item for a user in shoppingCarts table and update status of the bag to "available" in bag table
router.delete("/:userID/:bagID", isLoggedIn, async (req, res) => {
  const userID = req.params.userID;
  const bagID = req.params.bagID;
  try {
    const resInfo = await cartDao.removeItemFromCart(userID, bagID);
    const status = (await cartDao.getAllUserIncartByBagID(bagID)).length
      ? "available"
      : "in-cart";
    const updateBagStatusInfo = await bagDao.updateBagStatus(bagID, status);
    console.log(updateBagStatusInfo);
    res.status(200).json({ resInfo: resInfo });
  } catch (error) {
    console.error("Error add a item for a user in shopping cart: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to get all bag id by user id
router.get("/:userID", isLoggedIn, async (req, res) => {
  const userID = req.params.userID;
  try {
    const bags = await cartDao.getAllBagsInCartByUserID(userID);
    if (bags.length > 0) {
      res.json(bags);
    } else {
      res.status(404).json({ error: "No bag found for this user" });
    }
  } catch (error) {
    console.error("Error fetching bag:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to get all user id by bag id
router.get("/:bagID", isLoggedIn, async (req, res) => {
  const bagID = req.params.bagID;
  try {
    const users = await cartDao.getAllUserIncartByBagID(bagID);
    if (users.length > 0) {
      res.json(users);
    } else {
      res.status(404).json({ error: "No user found for this user" });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to confirm the cart and reserve all bags atomically
router.post("/:userID/confirm", isLoggedIn, async (req, res) => {
  const userID = req.params.userID;
  const { reservations } = req.body;
  // make sure reservations is an array
  if (!Array.isArray(reservations)) {
    return res.status(400).json({ error: "Invalid reservations data" });
  }
  try {
    // data base start transaction
    await new Promise((resolve, reject) => {
      db.run("BEGIN TRANSACTION", (err) => {
        if (err) {
          console.error("Error starting transaction: ", err);
          return reject(err);
        }
        resolve();
      });
    });

    // check if all bags are available
    for (const reservation of reservations) {
      const bag = await bagDao.getBagById(reservation.bagID);
      if (!bag || (bag.status !== "available" && bag.status !== "in-cart")) {
        // throw error if bag is not available
        throw new Error(
          `Bag not found or Bag ${reservation.bagID} is not available`
        );
      }
      // check one bag per establishment per day
      const pickupDate = bag.pickupStart.split("T")[0]; // e.g., "2023-10-01"
      const userReservations = await reservationDao.getReservationsByUserId(
        userID
      );
      const alreadyReserved = userReservations.some((r) => {
        // You may need to fetch bag info for each reservation to get establishmentID and pickup date
        return (
          r.bagID !== reservation.bagID && // ignore the current bag
          r.establishmentID === bag.establishmentID &&
          r.reservationTime.startsWith(pickupDate)
        );
      });
      if (alreadyReserved) {
        throw new Error(
          `User already has a reservation for establishment ${bag.establishmentID} on ${pickupDate}`
        );
      }
    }
    // reserve all bags and create reservation
    for (const reservation of reservations) {
      await bagDao.updateBagStatus(reservation.bagID, "reserved");
      await reservationDao.createReservation({
        userID: userID,
        bagID: reservation.bagID,
        allergies: reservation.allergies || "",
        specialRequests: reservation.specialRequests || "",
        removedItems: Array.isArray(reservation.removedItems)
          ? reservation.removedItems
          : [],
      });
      await cartDao.removeItemFromCart(userID, reservation.bagID);
    }
    await new Promise((resolve, reject) =>
      db.run("COMMIT", (err) => (err ? reject(err) : resolve()))
    );
    res
      .status(201)
      .json({ success: true, message: "Cart confirmed and bags reserved" });
  } catch (error) {
    await new Promise((resolve, reject) =>
      db.run("ROLLBACK", (err) => (err ? reject(err) : resolve()))
    );

    res.status(409).json({ error: error.message });
  }
});

module.exports = router;
