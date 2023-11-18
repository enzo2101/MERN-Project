import mongoose from "mongoose";
import express, { Request, Response } from "express";
import cors from "cors";

import Deck from "./models/Deck";

import { config } from "dotenv";
import { getDeckController } from "./controllers/getDeckController";
import { createDeckController } from "./controllers/createDeckController";
import { deleteDeckController } from "./controllers/deleteDeckController";
import { createCarForDeckController } from "./controllers/createCardForDeckController";
config();

const app = express();
const port = 5000;

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.get("/decks", getDeckController);

app.post("/decks", createDeckController);

app.delete("/decks/:deckId", deleteDeckController);

app.post("/decks/:deckId/cards", createCarForDeckController);

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`listening on port ${port}`);
  app.listen(port);
});
