import { getServer } from "./server.mjs";
import Cart_item_list from "../entities/cart_item_list.mjs";
import express from "express";
import morgan from "morgan";

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

app.listen(port, () => { console.log(`API server started at http://localhost:${port}`); });