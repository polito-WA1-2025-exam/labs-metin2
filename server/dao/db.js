"use strict";

/* 
    A shared database connection for the application.
    This module exports a singleton instance of the SQLite database connection.
*/

const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// open the database
const dbPath = path.join(__dirname, "../db/surplusfood.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database " + err.message);
  } else {
    console.log("Connected to the SQLite database. (dao/db.js)");
  }
});

// Export the database connection
module.exports = db;
// This module can be imported in other files to use the same database connection.
