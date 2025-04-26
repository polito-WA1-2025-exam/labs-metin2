"use strict";

/* 
    A data access object (DAO) for managing bags in the database.
    This module provides functions to interact with the bag table.
*/

const db = require("./db");

// Function to get all bags from the database
const getAllBags = () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM bag`;
    db.all(sql, [], (err, rows) => {
      if (err) {
        console.error("Error fetching bags: " + err.message);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// Function to get a bag by ID
const getBagById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM bag WHERE id = ?`;
    db.get(sql, [id], (err, row) => {
      if (err) {
        console.error("Error fetching bag by ID: " + err.message);
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

// Function to update bag status
const updateBagStatus = (BagID, status) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE bag SET status = ? WHERE id = ?`;
    db.run(sql, [status, BagID], (err, row) => {
      if (err) {
        console.error("Error update bag status by ID: " + err.message);
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

// Export the functions for use in other modules
module.exports = {
  getAllBags,
  getBagById,
  updateBagStatus,
};
// This module can be imported in other files to use the DAO functions for bags.
