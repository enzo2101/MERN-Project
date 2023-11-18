import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import deleteDeck from "./api/deleteDeck";
import { createDeck } from "./api/createDeck";
import { TDeck, getDecks } from "./api/getDecks";

function App() {
  const [decks, setDecks] = useState<TDeck[]>([]);
  const [title, setTitle] = useState("");

  async function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault(); // this is to don't refresh the form

    const deck = await createDeck(title);

    setDecks([...decks, deck]);
    setTitle("");
  }

  async function handleDeleteDeck (deckId: string) {
    await deleteDeck(deckId);

    setDecks(decks.filter((deck) => deck._id !== deckId));
  }

  useEffect(() => {
    async function fetchDecks() {
      const newDecks = await getDecks();
      setDecks(newDecks);
    }
    fetchDecks();
  }, []);

  return (
    <>
      <ul className="decks">
        {decks.map((deck) => (
          <li key={deck._id}>
            <button onClick={() => handleDeleteDeck(deck._id)}>X</button>

            <Link to={`decks/${deck._id}`}>{deck.title}</Link>
          </li>
        ))}
      </ul>
      <div className="App">
        <form onSubmit={handleCreateDeck}>
          <label htmlFor="deck-title">Deck Title</label>
          <input
            id="deck-title"
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(e.target.value);
            }}
          />
          <button type="submit">Create Deck</button>
        </form>
      </div>
    </>
  );
}

export default App;
