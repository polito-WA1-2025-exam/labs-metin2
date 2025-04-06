"use strict";

/* 
    A one-time script to create the database tables.
*/

const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// open the database
const dbPath = path.join(__dirname, "establishments.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database " + err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

// Create establishments table
const createEstablishmentsTable = () => {
  db.run(
    `CREATE TABLE IF NOT EXISTS establishments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
        address TEXT NOT NULL,
      phone TEXT NOT NULL,
        category TEXT NOT NULL
    )`,
    (err) => {
      if (err) {
        console.error("Error creating establishments table: " + err.message);
      } else {
        console.log("Establishments table created or already exists.");
      }
    }
  );
};

// close the database
const closeDatabase = () => {
  db.close((err) => {
    if (err) {
      console.error("Error closing database: " + err.message);
    } else {
      console.log("Database connection closed.");
    }
  });
};

// Execute the table creation
createEstablishmentsTable();
// Close the database connection
closeDatabase();
// This script should be run only once to create the tables.
