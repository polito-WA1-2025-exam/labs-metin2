"use strict";
/*
    A data access object (DAO) for managing users in the database.
    This module provides functions to interact with the user table.
*/

const db = require("./db");

//  Function to get users by ID
const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM users WHERE id = ?`;
    db.get(sql, [id], (err, row) => {
      if (err) {
        console.error("Error fetching user by ID: " + err.message);
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

// Function to get user by username
const getUserByUsername = (username) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM users WHERE username = ?`;
    db.get(sql, [username], (err, row) => {
      if (err) {
        console.error("Error fetching user by username: " + err.message);
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

// Export the functions for use in other modules
module.exports = {
  getUserById,
  getUserByUsername,
};
// This module can be imported in other files to use the DAO functions for users.
