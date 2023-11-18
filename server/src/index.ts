import mongoose from "mongoose";
import express, { Request, Response } from "express";
import cors from "cors";

import Deck from "./models/Deck";

import { config } from "dotenv";
config();

const app = express();
const port = 5000;

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.get("/decks", async (req: Request, res: Response) => {
  //fetch all decks and send back to the User
  const decks = await Deck.find();

  res.json(decks);
})

app.post("/decks", async (req: Request, res: Response) => {
  const newDeck = new Deck({
    title: req.body.title,
  });
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
});

app.delete("/decks/:deckId", async (req: Request, res: Response) => {
  // getting the id from the URL
  const deckId = req.params.deckId;
  // delete the deck from the mongo
 const deck = await Deck.findByIdAndDelete(deckId);
  // return the delete deck to the user who made the request
  res.json(deck);
})

mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log(`listening on port ${port}`);
  app.listen(port);
});
