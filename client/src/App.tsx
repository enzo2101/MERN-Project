import React, { useEffect, useState } from "react";
import "./App.css";

type TDeck = {
  title: string;
  _id: string;
}

function App() {
  const [decks, setDecks] = useState([]);
  const [title, setTitle] = useState("");

  function handleCreateDeck(e: React.FormEvent) {
    e.preventDefault(); // this is to don't refresh the form

    fetch("http://localhost:5000/decks", {
      method: "POST",
      body: JSON.stringify({
        title,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    setTitle("");
  }

  useEffect(() => {
    async function fetchDecks() {
      const response = await fetch("http://localhost:5000/decks");
      const newDecks = await response.json();
      setDecks(newDecks);
    }
    fetchDecks();
  }, []);

  return (
    <>
      <ul className="decks">
        {decks.map((deck) => (
          <li key={deck._id}>{deck.title}</li>
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
          <button>Create Deck</button>
        </form>
      </div>
    </>
  );
}

export default App;
