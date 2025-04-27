"use strict";
/* 
    A data access object (DAO) for managing shopping cart in the database.
    This module provides functions to interact with the cart table.
*/
const db = require("./db");

const addItemToCart = (userID, bagID) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO shoppingCarts (userID, bagID) VALUES (?,?) `;
    db.run(sql, [userID, bagID], function (err) {
      if (err) {
        console.error("Error add to cart: " + err.message);
        reject(err);
      } else {
        resolve({
          userID: userID,
          bagID: bagID,
        });
      }
    });
  });
};

const removeItemFromCart = (userID, bagID) => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM shoppingCarts WHERE userID = ? AND bagID = ?`;
    db.run(sql, [userID, bagID], function (err) {
      if (err) {
        console.error("Error remove item from cart: " + err.message);
        reject(err);
      } else {
        resolve({
          userID: userID,
          bagID: bagID,
        });
      }
    });
  });
};

const getAllBagsInCartByUserID = (userID) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM shoppingCarts WHERE userID = ?`;
    db.all(sql, [userID], (err, rows) => {
      if (err) {
        console.error(
          "Error fetching shoppingCarts by user ID: " + err.message
        );
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

const getAllUserIncartByBagID = (bagID) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM shoppingCarts WHERE bagID = ?`;
    db.all(sql, [bagID], (err, rows) => {
      if (err) {
        console.error("Error fetching shoppingCarts by bag ID: " + err.message);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};
// Export the functions for use in other modules
module.exports = {
  addItemToCart,
  removeItemFromCart,
  getAllBagsInCartByUserID,
  getAllUserIncartByBagID,
};
