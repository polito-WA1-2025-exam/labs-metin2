import sqlite from 'sqlite3'

import Order_item from "./order_item.mjs";
import Order from "./order.mjs";
import Food_item from "./food_item.mjs";

export default function Order_list() {
    this.order_list = [];

    //Method to Add new objects to the collection
    this.addOrder = (order) => this.order_list.push(order);

    //Method to Retrieve objects based on specific criteria
    this.getOrdersByUser = (user_id) => {
        let filtered_orders = this.order_list.filter((o) => o.user.id==user_id?true:false);
        return filtered_orders;
    };

    //Method to Manipulate the collection (e.g. sorting on specific properties, changing properties of multiple objects, test if the collection respects some constraints)
    //To Be Implemented

    //Method to Delete a specific object from the collection
    this.deleteCartItem = (id) => {
        const index = this.order_list.findIndex(o => o.id === id);
        this.order_list.splice(index, 1);
    }

    //Method to retrieve all orders of a user from DB
    this.getUserOrders = (userId) => new Promise((resolve, reject) => {
        const db = new sqlite.Database('./surplusFood/database.db', (err)=>{ if(err) console.log("DB problems", err)});
        const sql = `SELECT Orders.id, Orders.userId, 
                    Order_items.id AS 'order_itemId', Order_items.bagId, Order_items.pickup_time,
                    Food_items.id AS 'food_itemId', Food_items.name, Food_items.quantity
                    FROM Orders, Order_items
                    LEFT JOIN Order_food_items_to_delete ON Order_items.id = Order_food_items_to_delete.order_itemId 
                    LEFT JOIN Food_items ON Food_items.id = Order_food_items_to_delete.food_itemId
                    WHERE Orders.id = Order_items.orderId AND
                    Orders.userId = ?`;

        db.all(sql, [userId], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                if (!rows) {
                    reject(err);
                } else {

                    const combinedFood_items = rows.reduce((acc, row) => {
                        if (!acc[row.order_itemId]) {
                            acc[row.order_itemId] = { id: row.id, userId: row.userId, order_itemId: row.order_itemId, bagId: row.bagId, pickup_time: row.pickup_time, food_items: []};
                        }
                        if (row.food_itemId != null){
                            acc[row.order_itemId].food_items.push(new Food_item(row.food_itemId, row.name, row.quantity));
                        }
                      
                        return acc;
                    }, {});

                    const combinedOrder_items = Object.values(combinedFood_items).reduce((acc, row) => {
                        if (!acc[row.id]) {
                            acc[row.id] = { id: row.id, userId: row.userId, order_items: []};
                        }
                        acc[row.id].order_items.push(new Order_item(row.order_itemId, row.bagId, row.pickup_time, row.food_items));
                      
                        return acc;
                    }, {});

                    const intermediate = Object.values(combinedOrder_items);
    
                    const result = intermediate.map((item) => new Order(item.id, item.userId, item.order_items));
                    resolve(result);
                }
            }
        });

        db.close();
    })
}