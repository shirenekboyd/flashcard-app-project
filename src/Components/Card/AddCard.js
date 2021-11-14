import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck, createCard } from "../../utils/api";
import FormCard from "./FormCard";

//The screen displays the "React Router: Add Card" deck title.
//A form is shown with the "front" and "back" fields for a new card. Both fields use a <textarea> tag that can accommodate multiple lines of text.
//If the user clicks "Save", a new card is created and associated with the relevant deck. Then the form is cleared and the process for adding a card is restarted.
//If the user clicks "Done", the user is taken to the Deck screen.

function AddCard() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});

  useEffect(() => {
    readDeck(deckId).then((response) => setDeck(response));
  }, [deckId]);

  async function handleSubmit(front, back, setFront, setBack) {
    createCard(deckId, { front, back });
    setFront("");
    setBack("");
  }
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      <h2>{deck.name}: Add Card</h2>
      <FormCard handleSubmit={handleSubmit} />
    </>
  );
}

export default AddCard;
