import React, { useState, useEffect } from "react";
import { useRouteMatch, useParams, Link } from "react-router-dom";
import { readDeck, readCard } from "../../utils/api";

export default function FormCard({ handleSubmit }) {
  const { url } = useRouteMatch();
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const [front, setFront] = useState("");
  const [back, setBack] = useState("");
  const [frontPlaceholder, setFrontPlaceholder] =
    useState("Front side of card");
  const [backPlaceholder, setBackPlaceholder] = useState("Back side of card");

  useEffect(() => {
    if (url.includes("edit")) {
      setIsEdit(true);
      readCard(cardId).then((response) => {
        setFrontPlaceholder(response.front);
        setBackPlaceholder(response.back);
        setFront(response.front);
        setBack(response.back);
      });
    }
  }, [frontPlaceholder, backPlaceholder, url, cardId]);

  useEffect(() => {
    readDeck(deckId).then((response) => setDeck(response));
  }, [deckId]);

  function handleFrontChange(evt) {
    setFront(evt.target.value);
  }
  function handleBackChange(evt) {
    setBack(evt.target.value);
  }
  function onCardSubmit(evt) {
    evt.preventDefault();
    handleSubmit(front, back, setFront, setBack);
  }

  return (
    <form onSubmit={onCardSubmit}>
      <div className="mb-3">
        <label htmlFor="front" className="form-label">
          Front
        </label>
        <textarea
          className="form-control"
          id="description"
          rows="3"
          placeholder={frontPlaceholder}
          onChange={handleFrontChange}
          value={front}
          required
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="Back" className="form-label">
          Back
        </label>
        <textarea
          className="form-control"
          id="description"
          rows="3"
          placeholder={backPlaceholder}
          onChange={handleBackChange}
          value={back}
          required
        ></textarea>
      </div>

      {isEdit ? (
        <>
          <Link
            to={`/decks/${deck.id}`}
            type="button"
            className="btn btn-secondary m-2"
          >
            Cancel
          </Link>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </>
      ) : (
        <>
          <Link to={`/decks/${deck.id}`} className="btn btn-secondary m-2">
            Done
          </Link>
          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </>
      )}
    </form>
  );
}
