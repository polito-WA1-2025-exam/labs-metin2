# Group "metin2"

## Members

- s336830 TIANSHI LIU
- s348579 ZUNINO RAFFAELE
- s342937 OGGERO PAOLO

# Exercise "SurplusFood"

# Lab Journal

(you may update this file to keep track of the progress of your group work, throughout the weeks)

# Database description

- Table Users stores all users (id, username, password)
- Table Establishments stores all establishments (id, name, address, phone_number, type_cuisine)
- Table Bags stores all bags and a reference to the establishment that produced the bag (id, type, status, price, size, establishmentId)
- Table Food_items stores all food items and a reference to the bag they belong to (id, name, quantity, bagId)
- Table Cart_items stores all carts, both a reference to the user is saved as well as one to the desired bag. the pickup time selected is also saved (id, userId, bagId, pickup_time)
- Table Cart_food_items_to_delete stores the food items that a user wants to delete from an item in their cart (id, cart_itemId, food_itemId)
- Table Orders stores all orders (id, userid)
- Table Order_items stores all orders items (id, bagId, puckup_time, orderId)
- Table Order_food_items_to_delete stores the food items that a user wants to delete from an item in an order (id, order_itemId, food_itemId)

Cart_items contains all carts items since a user can only have one cart, while for orders Order and Order_items are distinct tables to retain the hierarchy, since a user can have more orders and an order can have multiple order items (bags).

# API

- Read the list of all establishments
    URL: `/api/establishments`
    HTTP METHOD: GET
    returns an array of establishments

- Read the list of all bags
    URL: `/api/bags`
    HTTP METHOD: GET
    returns an array of bags

- Read the list of bags of an establishment
    URL: `/api/establishments/:id/bags`
    HTTP METHOD: GET
    returns an array of bags

- Read the list of orders of a user
    URL: `/api/users/:id/orders`
    HTTP METHOD: GET
    returns an array of orders

- Read the list of cart_items of a user
    URL: `/api/users/:id/cart_items`
    HTTP METHOD: GET
    returns an array of cart_items

- Create a cart_item
    URL: `/api/cart_items`
    HTTP METHOD: POST
    receive a cart_item object with 'id' field missing or undefined 
    returns the id of the created cart_item

- Create an order
    URL: `/api/orders`
    HTTP METHOD: POST
    receive a order object with 'id' field missing or undefined 
    returns the id of the created order

- Delete a cart_item
    URL: `/api/cart_items`
    HTTP METHOD: DELETE
    receives the id of an order_item and deletes the corresponding cart_item

- Delete an order_item if the pickup_time hasn't already passed
    URL: `/api/order_items`
    HTTP METHOD: DELETE
    receives the id of an order_item and deletes the corresponding order_item

- Update cart_item
    PUT /cart_items
    receives a cart_item object and updates the database

- Update order_item
    PUT order_items
    receives a order_item object and updates the database
