import Deck from "../models/Deck";
import { Request, Response } from "express";

export async function getDecksController(req: Request, res: Response) {
  //fetch all decks and send back to the User
  const decks = await Deck.find();

  res.json(decks);
}
