"use strict";
/* 
    A data access object (DAO) for managing reservations in the database.
    This module provides functions to interact with the reservation table.
*/
const db = require("./db");

// Function to create a new reservation
const createReservation = (reservation) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT INTO reservations (userID, bagID, status, allergies, specialRequests, removedItems) VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.run(
      sql,
      [
        reservation.userID,
        reservation.bagID,
        reservation.status,
        reservation.allergies,
        reservation.specialRequests,
        JSON.stringify(reservation.removedItems),
      ],
      function (err) {
        if (err) {
          console.error("Error creating reservation: " + err.message);
          reject(err);
        } else {
          resolve(this.lastID);
        }
      }
    );
  });
};

// Function to delete a reservation by bag ID which is a foreign key
const deleteReservationByBagId = (bagID) => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM reservations WHERE bagID = ?`;
    db.run(sql, [bagID], function (err) {
      if (err) {
        console.error("Error deleting reservation by bag ID: " + err.message);
        reject(err);
      } else {
        resolve(this.changes);
      }
    });
  });
};

// Function to get reservations by bag ID
const getReservationsByBagId = (bagID) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM reservations WHERE bagID = ?`;
    db.all(sql, [bagID], (err, rows) => {
      if (err) {
        console.error("Error fetching reservations by bag ID: " + err.message);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// Function to get reservations by user ID
const getReservationsByUserId = (userID) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM reservations WHERE userID = ?`;
    db.all(sql, [userID], (err, rows) => {
      if (err) {
        console.error("Error fetching reservations by user ID: " + err.message);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

// Export the functions to use in other modules
module.exports = {
  createReservation,
  deleteReservationByBagId,
  getReservationsByBagId,
  getReservationsByUserId,
};
