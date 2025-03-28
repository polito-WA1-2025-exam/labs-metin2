import sqlite from "sqlite3";
import {Bag} from "../models/Bag.mjs";

const db = new sqlite.Database("database2.db", (err) => {
  if (err) throw err;
});

export const getAllBag = () => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM Bag";
    db.all(sql, (err, rows) => {
      if (err) reject(err);
      else {
        const bagsList = rows.map(
          (bag) =>
            new Bag(
              bag.id,
              bag.type,
              bag.status,
              bag.price,
              bag.size,
              bag.establishmentId
            )
        );
        resolve(bagsList);
      }
    });
  });
};

export const addBag = (bag) => {
  return new Promise((resolve, reject) => {
    const sql =
      "INSERT INTO Bag (type, status, price, size, establishmentId) VALUES (?, ?, ?, ?, ?)";
    db.run(
      sql,
      [bag.type, bag.status, bag.price, bag.size, bag.establishmentId],
      function (err) {
        if (err) reject(err);
        else resolve(this.lastID);
      }
    );
  });
};
