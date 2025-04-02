import { getServer } from "./server.mjs";
import Order_list from "../entities/order_list.mjs";
import Order from "../entities/order.mjs";
import Order_item from "../entities/order_item.mjs";
import Food_item from "../entities/food_item.mjs";
import express from "express";
import {check, validationResult} from 'express-validator';
import morgan from "morgan";

const app = getServer();
app.use(express.json());
app.use(morgan("dev"));

const port = 3001;


//GET user orders
app.get("/users/:id/orders", async (request, response) => {
  try {
    const orders = await new Order_list().getUserOrders(request.params.id);
    response.json(orders);
  } catch {
    response.status(500).end();
  }
});

//POST user order
app.post("/users/:id/orders", [
  check('orderitems').notEmpty()
], async (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()});
  }

  const myOrder = request.body;
  const userId = request.params.id;
  const newOrder = new Order(undefined, userId, []);
  for (const order_item of myOrder.orderitems) {
    const newOrder_item = new Order_item(undefined, order_item.bagId, order_item.pickup_time, []);
    console.log(newOrder_item);
    for (const food_item_to_delete of order_item.food_items_to_delete) {
      newOrder_item.food_items_to_delete.push(new Food_item(food_item_to_delete.id, food_item_to_delete.name, food_item_to_delete.quantity));
    }
    newOrder.orderitems.push(newOrder_item);
  }
  try {
    const id = await new Order_list().addOrder(newOrder);
    response.status(201).location(id).end();
  } catch {
    response.status(500).end();
  }
});

app.listen(port, () => { console.log(`API server started at http://localhost:${port}`); });