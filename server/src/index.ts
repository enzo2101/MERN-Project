import mongoose from "mongoose";
import express, { Request, Response } from "express";

import Deck from "./models/Deck";

const app = express();
const port = 5000;

app.post("/decks", async (req: Request, res: Response) => {
  const newDeck = new Deck({
    title: "my awesome flashcard deck",
  });
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
});

mongoose
  .connect(
    "mongodb+srv://Mochye:EOPrzLqGmYj6rgVV@cluster0.firtit5.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log(`listening on port ${port}`);
    app.listen(port);
  });
