"use strict";

/* 
    A one-time script to populate the database with sample data.
*/

/* 
Database requirements
The student must implement the project database and be pre-loaded with at least four establishments, 8 bags (half of them surprise and the other half regular), 12 food items, and three registered users, of whom two have already reserved some bags on the current day.

*/

const sqlite3 = require("sqlite3").verbose();
const { type } = require("os");
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

// sample data for bag table
// 4 establishments
//  8 bags (half of them surprise and the other half regular)
const sampleDataForBagTable = [
  {
    type: "regular",
    content: "Apples, Bananas, Oranges",
    price: 10.0,
    size: "small",
    pickupStart: "2023-10-01T09:00:00",
    pickupEnd: "2023-10-01T12:00:00",
    establishmentID: 1,
  },
  {
    type: "regular",
    content: "Bread, Milk, Eggs",
    price: 15.0,
    size: "medium",
    pickupStart: "2023-10-02T09:00:00",
    pickupEnd: "2023-10-02T12:00:00",
    establishmentID: 2,
  },
  {
    type: "surprise",
    content: "Surprise Bag 1",
    price: 20.0,
    size: "large",
    pickupStart: "2023-10-03T09:00:00",
    pickupEnd: "2023-10-03T12:00:00",
    establishmentID: 3,
  },
  {
    type: "surprise",
    content: "Surprise Bag 2",
    price: 25.0,
    size: "small",
    pickupStart: "2023-10-04T09:00:00",
    pickupEnd: "2023-10-04T12:00:00",
    establishmentID: 4,
  },
  {
    type: "regular",
    content: "Chicken, Rice, Vegetables",
    price: 12.0,
    size: "medium",
    pickupStart: "2023-10-05T09:00:00",
    pickupEnd: "2023-10-05T12:00:00",
    establishmentID: 1,
  },
  {
    type: "regular",
    content: "Pasta, Sauce, Cheese",
    price: 18.0,
    size: "large",
    pickupStart: "2023-10-06T09:00:00",
    pickupEnd: "2023-10-06T12:00:00",
    establishmentID: 2,
  },
  {
    type: "surprise",
    content: "Surprise Bag 3",
    price: 22.0,
    size: "small",
    pickupStart: "2023-10-07T09:00:00",
    pickupEnd: "2023-10-07T12:00:00",
    establishmentID: 3,
  },
  {
    type: "surprise",
    content: "Surprise Bag 4",
    price: 30.0,
    size: "medium",
    pickupStart: "2023-10-08T09:00:00",
    pickupEnd: "2023-10-08T12:00:00",
    establishmentID: 4,
  },
];

// sample data for user table
// three registered users, of whom two have already reserved some bags on the current day.
const sampleDataForUserTable = [
  {
    name: "John",
    email: "john.doe@gmail.com",
    password: "password123",
    salt: "salt123",
    fullName: "John Doe",
  },
  {
    name: "Jane",
    email: "jane.smith@gmail.com",
    password: "password456",
    salt: "salt456",
    fullName: "Jane Smith",
  },
  {
    name: "Alice",
    email: "alice.johnson@gmial.com",
    password: "password789",
    salt: "salt789",
    fullName: "Alice Johnson",
  },
];

// sample data for reservation table
//  two users have already reserved some bags on the current day. their ids are 1 and 2
const sampleDataForReservationTable = [
  {
    userID: 1,
    bagID: 1,
    status: "reserved",
    allergies: "none",
    specialRequests: "none",
    removedItems: "none",
  },
  {
    userID: 2,
    bagID: 3,
    status: "reserved",
    allergies: "none",
    specialRequests: "none",
    removedItems: "none",
  },
  {
    userID: 1,
    bagID: 5,
    status: "in-cart",
    allergies: "none",
    specialRequests: "none",
    removedItems: "none",
  },
  {
    userID: 2,
    bagID: 7,
    status: "in-cart",
    allergies: "none",
    specialRequests: "none",
    removedItems: "none",
  },
];

// Function to insert bag, user, reaervation sample data into tables
const insertSampleDataToTables = () => {
  db.serialize(() => {
    // insert sample data into bag table
    const insertBag = db.prepare(
      "INSERT INTO bag (type, content, price, size, pickupStart, pickupEnd, establishmentID) VALUES (?, ?, ?, ?, ?, ?, ?)"
    );
    sampleDataForBagTable.forEach((bag) => {
      insertBag.run(
        [
          bag.type,
          bag.content,
          bag.price,
          bag.size,
          bag.pickupStart,
          bag.pickupEnd,
          bag.establishmentID,
        ],
        (err) => {
          if (err) {
            console.error(
              "Error inserting data into bag table: " + err.message
            );
          } else {
            console.log(`Inserted into bag table: ${bag.content}`);
          }
        }
      );
    });
    insertBag.finalize((err) => {
      if (err) {
        console.error("Error finalizing bag statement: " + err.message);
      }
    });
    // insert sample data into user table
    const insertUser = db.prepare(
      "INSERT INTO users (name, email, password, salt, fullName) VALUES (?, ?, ?, ?, ?)"
    );
    sampleDataForUserTable.forEach((user) => {
      insertUser.run(
        [user.name, user.email, user.password, user.salt, user.fullName],
        (err) => {
          if (err) {
            console.error(
              "Error inserting data into users table: " + err.message
            );
          } else {
            console.log(`Inserted into users table: ${user.name}`);
          }
        }
      );
    });
    insertUser.finalize((err) => {
      if (err) {
        console.error("Error finalizing user statement: " + err.message);
      }
    });
    // insert sample data into reservation table
    const insertReservation = db.prepare(
      "INSERT INTO reservations (userID, bagID, status, allergies, specialRequests, removedItems) VALUES (?, ?, ?, ?, ?, ?)"
    );
    sampleDataForReservationTable.forEach((reservation) => {
      insertReservation.run(
        [
          reservation.userID,
          reservation.bagID,
          reservation.status,
          reservation.allergies,
          reservation.specialRequests,
          reservation.removedItems,
        ],
        (err) => {
          if (err) {
            console.error(
              "Error inserting data into reservation table: " + err.message
            );
          } else {
            console.log(
              `Inserted into reservation table: ${reservation.userID}`
            );
          }
        }
      );
    });
    insertReservation.finalize((err) => {
      if (err) {
        console.error("Error finalizing reservation statement: " + err.message);
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
insertSampleDataToTables();

// Close the database connection
closeDatabase();
// This script should be run only once to populate the database with sample data.
