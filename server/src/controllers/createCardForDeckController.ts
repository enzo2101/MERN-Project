import Deck from "../models/Deck";
import { Request, Response } from "express";

export async function createCarForDeckController(req: Request, res: Response) {
  const deckId = req.params.deckId;
  const deck = await Deck.findById(deckId);
  if (!deck) return res.status(400).send("no deck of this id exists");
  const { text } = req.body;
  deck.cards.push(text);
  await deck.save();
  res.json(deck);

  const newDeck = new Deck({
    title: req.body.title,
  });
  const createdDeck = await newDeck.save();
  res.json(createdDeck);
}
