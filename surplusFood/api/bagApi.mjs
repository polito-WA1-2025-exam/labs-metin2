import { getServer } from "./server.mjs";
import Bag_list from "../entities/bag_list.mjs";
import express from "express";
import morgan from "morgan";

const app = getServer();
app.use(express.json());
app.use(morgan("dev"));

app.get("/establishments/:id/bags", async (request, response) => {
  try {
    const bags = await new Bag_list().getEstablishmentBags(request.params.id);
    if (bags.error) {
      response.status(404).json(bags);
    } else {
      response.json(bags);
    }
  } catch {
    response.status(500).end();
  }
});


