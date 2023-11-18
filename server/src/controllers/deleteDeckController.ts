import Deck from "../models/Deck";
import { Request, Response } from "express";

export async function deleteDeckController (req: Request, res: Response) {
    // getting the id from the URL
    const deckId = req.params.deckId;
    // delete the deck from the mongo
   const deck = await Deck.findByIdAndDelete(deckId);
    // return the delete deck to the user who made the request
    res.json(deck);
  }