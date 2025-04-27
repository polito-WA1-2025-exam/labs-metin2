"use strict";
/* 
    Express route for managing shopping cart.
    This module defines the API endpoints for fetching shoppingCarts data.
*/
const express = require("express");
const router = express.Router();
const cartDao = require("../dao/cartDao");
const bagDao = require("../dao/bagDao");
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
