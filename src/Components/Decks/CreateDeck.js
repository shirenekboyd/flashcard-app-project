//---Come back and delete unused imports, etc.----

import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api";

function CreateDeck() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const history = useHistory();

  function handleNameChange(evt) {
    setName(evt.target.value);
  }
  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }
  function handleSubmit(evt) {
    evt.preventDefault();
    createDeck({ name, description }).then((response) => {
      history.push(`/decks/${response.id}`);
    });
  }
  //There is a breadcrumb navigation bar with a link to home / followed by the text Create Deck (i.e., Home/Create Deck).
  //in the return statement (JSX) A form is shown with the appropriate fields for creating a new deck.
  //The name field is an <input> field of type text.
  //The description field is a <textarea> field that can be multiple lines of text.
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Deck
          </li>
        </ol>
      </nav>
      <h2>Create Deck</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Deck Name"
            onChange={handleNameChange}
            value={name}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            placeholder="Brief description of the deck"
            onChange={handleDescriptionChange}
            value={description}
            required
          ></textarea>
        </div>
        {/*If the user clicks "cancel", the user is taken to the Home screen. */}
        <Link to="/" type="btn" className="btn btn-secondary m-2">
          Cancel
        </Link>
        {/*If the user clicks "submit", the user is taken to the Deck screen. */}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}

export default CreateDeck;
