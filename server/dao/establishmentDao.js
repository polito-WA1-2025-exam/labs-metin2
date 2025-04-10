"use strict";

/* 
    A data access object (DAO) for managing establishments in the database.
    This module provides functions to interact with the establishments table.
*/

const db = require("./db");

// Function to get all establishments from the database
const getAllEstablishments = () => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM establishments`;
    db.all(sql, [], (err, rows) => {
      if (err) {
        console.error("Error fetching establishments: " + err.message);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// Function to get an establishment by ID
const getEstablishmentById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM establishments WHERE id = ?`;
    db.get(sql, [id], (err, row) => {
      if (err) {
        console.error("Error fetching establishment by ID: " + err.message);
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
};

// Export the functions for use in other modules
module.exports = {
  getAllEstablishments,
  getEstablishmentById,
};
// This module can be imported in other files to use the DAO functions for establishments.
