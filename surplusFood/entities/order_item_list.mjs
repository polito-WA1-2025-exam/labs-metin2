import sqlite from 'sqlite3'
import Food_item_list from "./food_item_list.mjs";

export default function Order_item_list() {

    //Method to retrieve all order_itemIds given the orderId from DB
    this.getOrder_itemIds = (orderId) => new Promise((resolve, reject) => {
        const db = new sqlite.Database('./surplusFood/database.db', (err)=>{ if(err) console.log("DB problems", err)});
        const sql = `SELECT Order_items.id
                    FROM Order_items
                    WHERE Order_items.orderId = ?`;

        db.all(sql, [orderId], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                if (!rows) {
                    reject(err);
                } else {
                    const result = rows.map((item) => item.id);
                    resolve(result);
                }
            }
        });

        db.close();
    })

    this.addOrder_item = (order_item, newOrderId) => {
        return new Promise((resolve, reject) => {
            const db = new sqlite.Database('./surplusFood/database.db', (err)=>{ if(err) console.log("DB problems", err)});
            const sqlOrder_item = `INSERT INTO Order_items (bagId, pickup_time, orderId)
                                VALUES (?,?,?)`;
    
            db.run(sqlOrder_item, [order_item.bagId, order_item.pickup_time, newOrderId], async function (err) {
            if (err)
                reject(err);
            else {
                const newOrder_itemId = this.lastID;
                const food_item_list = new Food_item_list();

                for  (const food_item of order_item.food_items_to_delete) {
                    await food_item_list.addOrder_Food_item_delete(food_item.id, newOrder_itemId);
                }
                resolve(newOrder_itemId);
            }
            });
            db.close();
        })
    }

    //Method to add a new cart_item to the DB
    this.deleteOrder_item = (orderId) => new Promise( async (resolve, reject) => {
        const db = new sqlite.Database('./surplusFood/database.db', (err)=>{ if(err) console.log("DB problems", err)});
        const sqlCart_item = `DELETE FROM Order_items 
                            WHERE orderId = ?`;
        const order_itemIds = await this.getOrder_itemIds(orderId);

        db.run(sqlCart_item, [orderId], async function (err) {
            if (err)
                reject(err);
            else {
                const food_item_list = new Food_item_list();

                for (const id of order_itemIds) {
                    await food_item_list.deleteOrder_Food_item_delete(id);
                }

                resolve(orderId);
            }
        });

        db.close();
    })

}