import sqlite from 'sqlite3'

import Bag from "./bag.mjs";
import Food_item from "./food_item.mjs";

export default function Bag_list() {
    this.bag_list = [];

    /*
    //Method to Add new objects to the collection
    this.addBag = (bag) => this.bag_list.push(bag);

    //Method to Retrieve objects based on specific criteria
    this.getBagByStatus = (status) => {
        let filtered_bags = this.bag_list.filter((b) => b.status==status?true:false);
        return filtered_bags;
    };

    //Method to Manipulate the collection (e.g. sorting on specific properties, changing properties of multiple objects, test if the collection respects some constraints)
    //To Be Implemented

    //Method to Delete a specific object from the collection
    this.deleteBag = (id) => {
        const index = this.bag_list.findIndex(b => b.id === id);
        this.bag_list.splice(index, 1);
    }
    */

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
        const sqlFood_item = `INSERT INTO Food_items (name, quantity, bagId)
                    VALUES (?,?,?)`;

        db.run(sqlBag, [bag.type, bag.status, bag.price, bag.size, bag.establishmentId], async function (err) {
            if (err)
                reject(err);
            else {
                const newBagId = this.lastID;

                for  (const food_item of bag.food_items) {
                    await addFood_item(food_item, newBagId);
                }
                resolve(newBagId);
            }
        });

        db.close();
    })
}

//to be moved to food_item.mjs
function addFood_item(food_item, newBagId) {
    return new Promise((resolve, reject) => {
        const db = new sqlite.Database('./surplusFood/database.db', (err)=>{ if(err) console.log("DB problems", err)});
        const sqlFood_item = `INSERT INTO Food_items (name, quantity, bagId)
                            VALUES (?,?,?)`;

        db.run(sqlFood_item, [food_item.name, food_item.quantity, newBagId], function (err) {
        if (err)
            reject(err);
        else
            resolve(this.lastID);
        });
        db.close();
    })
}