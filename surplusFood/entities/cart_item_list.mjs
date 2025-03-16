import sqlite from 'sqlite3'
import Cart_item from './cart_item.mjs';
import Food_item from './food_item.mjs';

export default function Cart_item_list() {
    this.cart_item_list = [];

    //Method to Add new objects to the collection
    this.addCartItem = (cart_item) => this.cart_item_list.push(cart_item);

    //Method to Retrieve objects based on specific criteria
    this.getCartItemsByUser = (user_id) => {
        let filtered_cartitems = this.cart_item_list.filter((c) => c.user.id==user_id?true:false);
        return filtered_cartitems;
    };

    //Method to Manipulate the collection (e.g. sorting on specific properties, changing properties of multiple objects, test if the collection respects some constraints)
    //To Be Implemented

    //Method to Delete a specific object from the collection
    this.deleteCartItem = (id) => {
        const index = this.cart_item_list.findIndex(c => c.id === id);
        this.cart_item_list.splice(index, 1);
    }

//Method to retrieve all orders of a user from DB
    this.getUserCart = (userId) => new Promise((resolve, reject) => {
        const db = new sqlite.Database('./surplusFood/database.db', (err)=>{ if(err) console.log("DB problems", err)});
        const sql = `SELECT Cart_items.id, Cart_items.userId, Cart_items.bagId, Cart_items.pickup_time,
                    Food_items.id AS 'food_itemId', Food_items.name, Food_items.quantity
                    FROM Cart_items 
                    LEFT JOIN Cart_food_items_to_delete ON Cart_items.id = Cart_food_items_to_delete.food_itemId
                    LEFT JOIN Food_items ON Cart_food_items_to_delete.food_itemId = Food_items.id
                    WHERE Cart_items.userId = ?`;

        db.all(sql, [userId], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                if (!rows) {
                    reject(err);
                } else {

                    const combinedFood_items = rows.reduce((acc, row) => {
                        if (!acc[row.order_itemId]) {
                            acc[row.order_itemId] = { id: row.id, userId: row.userId, bagId: row.bagId, pickup_time: row.pickup_time, food_items: []};
                        }
                        if (row.food_itemId != null){
                            acc[row.order_itemId].food_items.push(new Food_item(row.food_itemId, row.name, row.quantity));
                        }
                      
                        return acc;
                    }, {});

                    const intermediate = Object.values(combinedFood_items);
    
                    const result = intermediate.map((item) => new Cart_item(item.id, item.userId, item.bagId, item.pickup_time, item.food_items));
                    resolve(result);
                }
            }
        });

        db.close();
    })
}