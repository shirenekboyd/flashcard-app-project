import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, updateCard } from "../../utils/api";
import FormCard from "./FormCard";

//You must use the readDeck() function from src/utils/api/index.js to load the deck that contains the card to be edited.
//Additionally, you must use the readCard() function from src/utils/api/index.js to load the card that you want to edit.
//It displays the same form as the Add Card screen, except it is pre-filled with information for the existing card. It can be edited and updated.

function EditCard() {
  const { deckId, cardId } = useParams();
  const id = cardId;
  const [deck, setDeck] = useState({});
  const history = useHistory();

  useEffect(() => {
    readDeck(deckId).then((response) => setDeck(response));
  }, [deckId]);
  async function handleSubmit(front, back) {
    await updateCard({ front, back, id, deckId: Number(deckId) });
    history.push(`/decks/${deck.id}`);
  }

  //There is a breadcrumb navigation bar with a link to home /, followed by the name of the deck of which the edited card is a member,
  //and finally the text Edit Card :cardId (e.g., Home/Deck React Router/Edit Card 4).
  //If the user clicks on either "Save" or "Cancel", the user is taken to the Deck screen.
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
            Edit Card {cardId}
          </li>
        </ol>
      </nav>
      <h2>Edit Card</h2>
      <FormCard handleSubmit={handleSubmit} />
    </>
  );
}

export default EditCard;
