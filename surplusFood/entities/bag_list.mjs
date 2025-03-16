import sqlite from 'sqlite3'

import Bag from "./bag.mjs";
import Food_item from "./food_item.mjs";

export default function Bag_list() {
    this.bag_list = [];

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

    //Method to retrieve all bags of an establishment from DB
    this.getEstablishmentBags = (establishmentId) => new Promise((resolve, reject) => {
        const db = new sqlite.Database('./surplusFood/database.db', (err)=>{ if(err) console.log("DB problems", err)});
        const sql = `SELECT Bags.*,Food_items.id as 'food_itemId', Food_items.name, Food_items.quantity
                    FROM Bags, Food_items
                    WHERE Food_items.bagId = Bags.id AND Bags.establishmentId = ?`;

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
}