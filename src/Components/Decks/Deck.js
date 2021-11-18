import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "../../utils/api";

export default function Deck() {
  const { deckId } = useParams();
  //console.log(deckId);
  const [deck, setDeck] = useState({ cards: [] });
  const history = useHistory();

  useEffect(() => {
    readDeck(deckId).then((response) => setDeck(response));
  }, [deckId]);

  //Deletes a single deck and refreshes the page. deckId is the id of the mapped deck
  const handleDeleteDeck = async (deckId) => {
    const result = window.confirm(
      "Delete this deck? \n\n You will not be able to recover it."
    );
    if (result) {
      await deleteDeck(deckId);
      //sends us home
      history.push("/");
    }
  };
//When the user clicks the "Delete" button associated with a card, a warning message is shown and the user can click "OK" or "Cancel". If the user clicks "OK", the card is deleted.
//You can use window.confirm() to create the modal dialog 
  const handleDeleteCard = async (cardId) => {
    const result = window.confirm(
      "Delete this card? \n\n You will not be able to recover it."
    );
    if (result) {
      await deleteCard(cardId);
      //refreshes our page after a delete
      history.go();
    }
  };

  const cardList = deck.cards.map(({ front, back, id }) => {
    return (
      <div className="card w-75 m-2" key={id}>
        <div className="card-body">
          <p className="card-text">{front}</p>
          <p className="card-text">{back}</p>
          <Link
            to={`/decks/${deck.id}/cards/${id}/edit`}
            className="btn btn-secondary col-2"
          >
            Edit
          </Link>
          <button
            type="btn"
            className="btn btn-danger col-2 m-2"
            onClick={() => handleDeleteCard(id)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  });
//There is a breadcrumb navigation bar with a link to home / followed by the name of the deck (e.g., Home/React Router).
//The screen includes "Edit", "Study", "Add Cards", and "Delete" buttons. Each button takes the user to a different destination
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>
      <div className="card" key={deck.id}>
        <div className="card-body">
          <h2 className="card-title">{deck.name}</h2>
          <p className="card-text">{deck.description}</p>
          <Link
            to={`/decks/${deck.id}/edit`}
            className="btn btn-secondary col-2"
          >
            Edit
          </Link>
          <Link
            to={`/decks/${deck.id}/study`}
            className="btn btn-primary m-2 col-4"
          >
            Study
          </Link>
          <Link
            to={`/decks/${deck.id}/cards/new`}
            className="btn btn-primary m-2 col-4"
          >
            Add Cards
          </Link>
          <button
            type="btn"
            className="btn btn-danger col-2"
            onClick={() => handleDeleteDeck(deckId)}
          >
            Delete
          </button>
        </div>
      </div>
      <h2>Cards</h2>
      {cardList}
    </>
  );
}
