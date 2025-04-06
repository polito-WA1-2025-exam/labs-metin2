"use strict";

/* 
    A one-time script to populate the database with sample data.
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

// Sample data to populate the establishments table
const sampleDataForSmall = [
  {
    name: "Store One",
    address: "123 Main St, Cityville",
    phone: "555-1234",
    category: "Retail",
  },
  {
    name: "Restaurant ABC",
    address: "456 Elm St, Townsville",
    phone: "555-9876",
    category: "Food & Drink",
  },
  {
    name: "Cafe XYZ",
    address: "789 Oak St, Villagetown",
    phone: "555-5678",
    category: "Food & Drink",
  },
  {
    name: "Gym Fitness",
    address: "101 Maple St, Citytown",
    phone: "555-8765",
    category: "Health & Fitness",
  },
  {
    name: "Bookstore 123",
    address: "202 Pine St, Booktown",
    phone: "555-4321",
    category: "Retail",
  },
];

const sampleDataForLarge = [
  {
    name: "Store Two",
    address: "234 Birch St, Cityville",
    phone: "555-2345",
    category: "Retail",
  },
  {
    name: "Restaurant DEF",
    address: "567 Cedar St, Townsville",
    phone: "555-6789",
    category: "Food & Drink",
  },
  {
    name: "Cafe LMN",
    address: "890 Spruce St, Villagetown",
    phone: "555-3456",
    category: "Food & Drink",
  },
  {
    name: "Gym Powerhouse",
    address: "111 Fir St, Citytown",
    phone: "555-6543",
    category: "Health & Fitness",
  },
  {
    name: "Bookstore ABCD",
    address: "222 Willow St, Booktown",
    phone: "555-7890",
    category: "Retail",
  },
];

// Function to insert sample data into the establishments table for small datasets
const insertSampleDataSmall = () => {
  const insertQuery =
    "INSERT INTO establishments (name, address, phone, category) VALUES (?, ?, ?, ?)";
  sampleDataForSmall.forEach((establishment) => {
    db.run(
      insertQuery,
      [
        establishment.name,
        establishment.address,
        establishment.phone,
        establishment.category,
      ],
      (err) => {
        if (err) {
          console.error("Error inserting data: " + err.message);
        } else {
          console.log(`Inserted: ${establishment.name}`);
        }
      }
    );
  });
};

// Function to insert sample data into the establishments table for large datasets
const insertSampleDataLarge = () => {
  db.serialize(() => {
    const insertQuery =
      "INSERT INTO establishments (name, address, phone, category) VALUES (?, ?, ?, ?)";
    const stmt = db.prepare(insertQuery);
    sampleDataForLarge.forEach((establishment) => {
      stmt.run(
        [
          establishment.name,
          establishment.address,
          establishment.phone,
          establishment.category,
        ],
        (err) => {
          if (err) {
            console.error("Error inserting data: " + err.message);
          } else {
            console.log(`Inserted: ${establishment.name}`);
          }
        }
      );
    });
    stmt.finalize((err) => {
      if (err) {
        console.error("Error finalizing statement: " + err.message);
      }
    });
  });
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

// Execute the data insertion
insertSampleDataSmall();
insertSampleDataLarge();

// Close the database connection
closeDatabase();
// This script should be run only once to populate the database with sample data.
