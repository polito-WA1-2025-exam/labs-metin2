import sqlite from 'sqlite3'

import Bag from "./bag.mjs";
import Food_item from "./food_item.mjs";
import Food_item_list from "./food_item_list.mjs";

export default function Bag_list() {

    //Method to retrieve all bags of an establishment from DB
    this.getEstablishmentBags = (establishmentId) => new Promise((resolve, reject) => {
        const db = new sqlite.Database('./surplusFood/database.db', (err)=>{ if(err) console.log("DB problems", err)});
        const sql = `SELECT Bags.*,Food_items.id as 'food_itemId', Food_items.name, Food_items.quantity
                    FROM Bags
                    LEFT JOIN Food_items ON Bags.id = Food_items.bagId
                    WHERE Bags.establishmentId = ?`;

        db.all(sql, [establishmentId], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                if (!rows) {
                    reject(err);
                } else {
                    const combinedData = rows.reduce((acc, row) => {
                        if (!acc[row.id]) {
                            acc[row.id] = { id: row.id, type: row.type, status: row.status, price: row.price, size: row.size, establishmentId: row.establishmentId, food_items: []};
                        }
                        if (row.food_itemId != null) 
                        acc[row.id].food_items.push(new Food_item(row.food_itemId, row.name, row.quantity));
                      
                        return acc;
                    }, {});
                      
                    const intermediate = Object.values(combinedData);
    
                    const result = intermediate.map((item) => new Bag(item.id, item.type, item.status, item.price, item.size, item.establishmentId, item.food_items ));
                    resolve(result);
                }

            }
        });

        db.close();
    })

    //Method to add a new bag to the DB
    this.addBag = (bag) => new Promise((resolve, reject) => {
        const db = new sqlite.Database('./surplusFood/database.db', (err)=>{ if(err) console.log("DB problems", err)});
        const sqlBag = `INSERT INTO Bags (type, status, price, size, establishmentId)
                    VALUES (?,?,?,?,?)`;

        db.run(sqlBag, [bag.type, bag.status, bag.price, bag.size, bag.establishmentId], async function (err) {
            if (err)
                reject(err);
            else {
                const newBagId = this.lastID;
                const food_item_list = new Food_item_list();
                for  (const food_item of bag.food_items) {
                    await food_item_list.addFood_item(food_item, newBagId);
                }
                resolve(newBagId);
            }
        });

        db.close();
    })

    //Method to add a new bag to the DB
    this.updateBagStatus = (id, status) => new Promise((resolve, reject) => {
        const db = new sqlite.Database('./surplusFood/database.db', (err)=>{ if(err) console.log("DB problems", err)});
        const sqlBag = `UPDATE Bags SET status = ?
                        WHERE id = ?`;

        db.run(sqlBag, [status, id], async function (err) {
            if (err)
                reject(err);
            else {
                resolve(id);
            }
        });

        db.close();
    })
}
