"use strict";

/* 
    A one-time script to create the database tables.
*/

const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// open the database
const dbPath = path.join(__dirname, "surplusfood.db");
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

// create bag table
const createBagTable = () => {
  db.run(
    `CREATE TABLE IF NOT EXISTS bag (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT NOT NULL,                     --  "suprise" or "regular"
        content TEXT,                           --  items listed in regular bag and option for suprise bag  
        price REAL NOT NULL,                    --  price of the bag
        size TEXT NOT NULL,                     --  size of the bag, "small", "medium", "large"
        pickupStart TEXT NOT NULL,              --  start time for pickup
        pickupEnd TEXT NOT NULL,                --  end time for pickup
        establishmentID INTEGER NOT NULL,
        FOREIGN KEY (establishmentID) REFERENCES establishments(id)
    )`,
    (err) => {
      if (err) {
        console.error("Error creating bag table: " + err.message);
      } else {
        console.log("Bag table created or already exists.");
      }
    }
  );
};

/* 
    TO DO:
    user table
    reservation table  
*/

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
