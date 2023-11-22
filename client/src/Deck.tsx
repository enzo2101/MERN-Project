import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./App.css";
// import deleteDeck from "./api/deleteDeck";
// import { createDeck } from "./api/createDeck";
import { createCard } from "./api/createCard";
import { TDeck } from "./api/getDecks";
import { getDeck } from "./api/getDeck";
import deleteCard from "./api/deleteCard";

export default function Deck() {
  const [deck, setDeck] = useState<TDeck | undefined>();
  const [cards, setCards] = useState<string[]>([]);
  const [text, setText] = useState("");
  const { deckId } = useParams();

  async function handleCreateCard(e: React.FormEvent) {
    e.preventDefault(); // this is to don't refresh the form
    const { cards: serverCards } = await createCard(deckId!, text);
    setCards(serverCards);
    setText("");
  }

  async function handleDeleteCard(index: number) {
    if (!deckId) return;
    const newDeck = await deleteCard(deckId, index);
    setCards(newDeck.cards);
    // setDecks(decks.filter((deck) => deck._id !== deckId));
  }

  useEffect(() => {
    async function fetchDeck() {
      if (!deckId) return;
      const newDeck = await getDeck(deckId);
      setDeck(newDeck);
      setCards(newDeck.cards || []);
    }
    fetchDeck();
  }, [deckId]);

  return (
    <>
      <ul className="decks">
        {cards.map((card, index) => (
          <li key={index}>
            <button onClick={() => handleDeleteCard(index)}>X</button>
            {card}
          </li>
        ))}
      </ul>
      <div className="App">
        <form onSubmit={handleCreateCard}>
          <label htmlFor="card-text">Card Text</label>
          <input
            id="card-text"
            value={text}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setText(e.target.value);
            }}
          />
          <button>Create Card</button>
        </form>
      </div>
    </>
  );
}
