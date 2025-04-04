import { getServer } from "./server.mjs";
import { addBag, getAllBag } from "../dao/BagDao.mjs";
import express from "express";
import morgan from "morgan";

const app = getServer();
app.use(express.json());
app.use(morgan("dev"));

/*
app.get("/bags", async (request, response) => {
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
});*/

app.get("/bags", async (request, response) => {
  try {
    const bagsList = await getAllBag();
    response.json(bagsList);
  } catch {}
});

app.post("/bags", async (request, response) => {
  try {
    const newBag = request.body;
    const id = await addBag(newBag);
    response.status(201).location(id).end();
  } catch (e) {
    console.error(e);
    response.status(503).json({ error: "Impossible to create the bag." });
  }
});
