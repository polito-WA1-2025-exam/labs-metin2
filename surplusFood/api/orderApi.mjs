import { getServer } from "./server.mjs";
import Order_list from "../entities/order_list.mjs";
import express from "express";
import morgan from "morgan";

const app = getServer();
app.use(express.json());
app.use(morgan("dev"));

const port = 3001;


//GET user cart
app.get("/users/:id/orders", async (request, response) => {
  try {
    const orders = await new Order_list().getUserOrders(request.params.id);
    response.json(orders);
  } catch {
    response.status(500).end();
  }
});

app.listen(port, () => { console.log(`API server started at http://localhost:${port}`); });