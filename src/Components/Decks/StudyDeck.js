import React, { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck } from "../../utils/api";

export default function StudyDeck() {
  const history = useHistory();
  const { deckId } = useParams();
  const [deck, setDeck] = useState({ cards: [] });
  //console.log(deck);
  const [currentCardNum, setCurrentCardNum] = useState(1);
  const [cardFront, setCardFront] = useState(true);
  useEffect(() => {
    readDeck(deckId).then((response) => setDeck(response));
  }, [deckId]);
  const card = deck.cards[currentCardNum - 1];

  //When all cards are finished, a message is shown and the user is offered the opportunity to restart the deck. If the user does not restart the deck, they return to the home screen.
  function handleNext() {
    if (currentCardNum !== deck.cards.length) {
      setCurrentCardNum(currentCardNum + 1);
      setCardFront(true);
    } else {
      //You can use window.confirm() to create the modal dialog
      const result = window.confirm(
        "Restart Cards? \n\n Click 'cancel' to return to the home page."
      );
      if (result) {
        setCurrentCardNum(1);
        setCardFront(true);
      } else {
        history.push("/");
      }
    }
  }
  //There is a breadcrumb navigation bar with links to home /
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
            Study
          </li>
        </ol>
      </nav>
      <div className="container">
        <h2>{deck.name}: Study</h2>
        <div className="card w-75">
          {deck.cards.length > 2 ? (
            <div className="card-body">
              <h5 className="card-title">
                Card {currentCardNum} of {deck.cards.length}
              </h5>

              {cardFront ? (
                <p className="card-text">{card.front}</p>
              ) : (
                <p className="card-text">{card.back}</p>
              )}
              {/*A button at the bottom of each card "flips" it to the other side. */}
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setCardFront(!cardFront)}
              >
                Flip
              </button>

              {!cardFront ? (
                <button
                  type="button"
                  className="btn btn-primary m-2"
                  onClick={handleNext}
                >
                  {/*After flipping the card, the screen shows a next button (see the "Next button" section below) to continue to the next card. */}
                  Next
                </button>
              ) : null}
            </div>
          ) : (
            <>
              <div className="card-body">
                <h3 className="card-title">Not Enough Cards</h3>
                {/*Studying a deck with two or fewer cards should display a "Not enough cards" message (see the "Not enough cards" section below) and a button to add cards to the deck. */}
                <p>
                  You need at least 3 cards to study. There are{" "}
                  {deck.cards.length} cards in this deck.
                </p>
                <Link
                  to={`/decks/${deck.id}/cards/new`}
                  className="btn btn-primary"
                >
                  Add Cards
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
