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
    GET /establishments
- Read the list of all bags
    GET /bags
- Read the list of bags of an establishment
    GET /establishments/:id/bags
- Read the list of orders of a user
    GET /users/:id/orders
- Read the list of cart_items of a user
    GET /users/:id/cart_items
- Create a cart_item
    POST /cart_items
- Create an order
    POST /orders
- Delete a cart_item
    DELETE /cart_items
- Delete an order_item if the pickup_time hasn't already passed
    DELETE /order_items
- Update cart_item
    PUT /cart_items
- Update order_item
    PUT order_items