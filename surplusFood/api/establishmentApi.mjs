import { getServer } from "./server.mjs";
import Establishment_list from "../entities/establishment_list.mjs";
import express from "express";
import morgan from "morgan";

const app = getServer();
app.use(express.json());
app.use(morgan("dev"));

const port = 3001;


//GET all establishments
app.get("/establishments", async (request, response) => {
  try {
    const establishments = await new Establishment_list().getAllEstablishments();
    response.json(establishments);
  } catch {
    response.status(500).end();
  }
});

app.listen(port, () => { console.log(`API server started at http://localhost:${port}`); });