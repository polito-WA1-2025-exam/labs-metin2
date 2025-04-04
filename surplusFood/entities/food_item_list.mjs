import sqlite from 'sqlite3'
import Food_item from "./food_item.mjs";

export default function Food_item_list() {

    //Method to retrieve all food_items of a bag from DB
    this.getBagFood_items = (bagId) => new Promise((resolve, reject) => {
        const db = new sqlite.Database('./surplusFood/database.db', (err)=>{ if(err) console.log("DB problems", err)});
        const sql = `SELECT Food_items.*
                    FROM Food_items
                    WHERE Food_items.bagId = ?`;

        db.all(sql, [bagId], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                if (!rows) {
                    reject(err);
                } else {
                    
                    const result = rows.map((item) => new Food_item(item.id, item.name, item.quantity));
                    resolve(result);
                }

            }
        });

        db.close();
    })

    this.addFood_item = (food_item, newBagId) => {
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

    this.addCart_Food_item_delete = (food_item_id, newCart_itemId) => {
        return new Promise((resolve, reject) => {
            const db = new sqlite.Database('./surplusFood/database.db', (err)=>{ if(err) console.log("DB problems", err)});
            const sqlFood_items_delete = `INSERT INTO Cart_food_items_to_delete (cart_itemId, food_itemId)
                                          VALUES (?,?)`;
      
            db.run(sqlFood_items_delete, [newCart_itemId, food_item_id], function (err) {
            if (err)
                reject(err);
            else
                resolve(this.lastID);
            });
            db.close();
        })
    }

    this.deleteCart_Food_item_delete = (cart_itemId) => {
        return new Promise((resolve, reject) => {
            const db = new sqlite.Database('./surplusFood/database.db', (err)=>{ if(err) console.log("DB problems", err)});
            const sqlFood_items_delete = `DELETE FROM Cart_food_items_to_delete 
                                            WHERE cart_itemId = ?`;
      
            db.run(sqlFood_items_delete, [cart_itemId], function (err) {
            if (err)
                reject(err);
            else
                resolve(this.lastID);
            });
            db.close();
        })
    }

    this.addOrder_Food_item_delete = (food_item_id, newOrder_itemId) => {
        return new Promise((resolve, reject) => {
            const db = new sqlite.Database('./surplusFood/database.db', (err)=>{ if(err) console.log("DB problems", err)});
            const sqlFood_items_delete = `INSERT INTO Order_food_items_to_delete (order_itemId, food_itemId)
                                          VALUES (?,?)`;
      
            db.run(sqlFood_items_delete, [newOrder_itemId, food_item_id], function (err) {
            if (err)
                reject(err);
            else
                resolve(this.lastID);
            });
            db.close();
        })
    }

    this.deleteOrder_Food_item_delete = (order_itemId) => {
        return new Promise((resolve, reject) => {
            const db = new sqlite.Database('./surplusFood/database.db', (err)=>{ if(err) console.log("DB problems", err)});
            const sqlFood_items_delete = `DELETE FROM Order_food_items_to_delete 
                                            WHERE order_itemId = ?`;
      
            db.run(sqlFood_items_delete, [order_itemId], function (err) {
            if (err)
                reject(err);
            else
                resolve(this.lastID);
            });
            db.close();
        })
    }

}