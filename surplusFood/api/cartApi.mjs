import { getServer } from "./server.mjs";
import express from "express";
import {check, validationResult} from 'express-validator';
import morgan from "morgan";
import Cart_item_list from "../entities/cart_item_list.mjs";
import Cart_item from "../entities/cart_item.mjs";

const app = getServer();
app.use(express.json());
app.use(morgan("dev"));

const port = 3001;


//GET user cart
app.get("/users/:id/cart_items", async (request, response) => {
  try {
    const cart = await new Cart_item_list().getUserCart(request.params.id);
    response.json(cart);
  } catch {
    response.status(500).end();
  }
});

//POST user cart item
app.post("/users/:id/cart_items", [
  check('bagId').notEmpty(),
  check('pickup_time').notEmpty()
], async (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()});
  }

  const myCart_item = request.body;
  const userId = request.params.id;
  const newCart_item = new Cart_item(undefined, userId, myCart_item.bagId, myCart_item.pickup_time, myCart_item.food_items_to_delete==null? [] : myCart_item.food_items_to_delete)
  try {
    const id = await new Cart_item_list().addCartItem(newCart_item);
    response.status(201).location(id).end();
  } catch {
    response.status(500).end();
  }
});

app.listen(port, () => { console.log(`API server started at http://localhost:${port}`); });