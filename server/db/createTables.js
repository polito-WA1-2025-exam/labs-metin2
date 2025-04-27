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
    process.exit(1);
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
        status TEXT NOT NULL DEFAULT "available", -- status of the bag, "available", "reserved", "in-cart"
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

// create user table
const createUserTable = () => {
  db.run(
    `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,           --  hashed+salted password 
        fullName TEXT NOT NULL
    )`,
    (err) => {
      if (err) {
        console.error("Error creating users table: " + err.message);
      } else {
        console.log("Users table created or already exists.");
      }
    }
  );
};

// create reservation table
const createReservationTable = () => {
  db.run(
    `CREATE TABLE IF NOT EXISTS reservations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userID INTEGER NOT NULL,
        bagID INTEGER NOT NULL,
        allergies TEXT,                               -- allergies of the user
        specialRequests TEXT,                      -- special requests of the user
        removedItems TEXT,                        -- items removed from the bag
        reservationTime TEXT DEFAULT CURRENT_TIMESTAMP,  -- time of reservation
        FOREIGN KEY (userID) REFERENCES users(id),
        FOREIGN KEY (bagID) REFERENCES bag(id)
    )`,
    (err) => {
      if (err) {
        console.error("Error creating reservations table: " + err.message);
      } else {
        console.log("Reservations table created or already exists.");
      }
    }
  );
};

// create cart table
const createCartTable = () => {
  db.run(
    `CREATE TABLE IF NOT EXISTS shoppingCarts (
  userID  INTEGER NOT NULL  REFERENCES users(id),
  bagID   INTEGER NOT NULL  REFERENCES bag(id),
  PRIMARY KEY(userID, bagID)
)
`,
    (err) => {
      if (err) {
        console.error("Error creating cart table: " + err.message);
      } else {
        console.log("Cart table created or already exists");
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

// Execute the establishments table creation
createEstablishmentsTable();
// Execute the bag table creation
createBagTable();
// Execute the user table creation
createUserTable();
// Execute the reservation table creation
createReservationTable();
// Execute the cart table creation
createCartTable();
// Close the database connection
closeDatabase();

// This script should be run only once to create the tables.
