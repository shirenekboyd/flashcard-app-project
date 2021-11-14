import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck, listDecks } from "../utils/api";

function Home() {
  const [decks, setDecks] = useState([]);

  const history = useHistory();

  //Existing decks are each shown with the deck name, the number of cards
  useEffect(() => {
    listDecks().then(setDecks);
  }, []);
  //console.log(decks);

  const handleDelete = async (deckId) => {
    const result = window.confirm(
      //You can use window.confirm() to create the modal dialog
      "Delete this deck? \n\n You will not be able to recover it."
    );
    if (result) {
      await deleteDeck(deckId);
      //refreshes our homepage after a delete
      history.go();
    }
  };
  const deckList = decks.map(({ id, name, description, cards }) => {
    //Navbar using bootstrap breadcrumb for styling
    return (
        
        <div className="card" key={id}>
          <div className="card-body">
            <h2 className="card-title">{name}</h2>
            <div>{cards.length} cards</div>
            <p className="card-text">{description}</p>
            <Link to={`/decks/${id}`} className="btn btn-secondary m-1">
              View
            </Link>
            <Link to={`/decks/${id}/study`} className="btn btn-primary">
                {/* Clicking the “Study” button brings the user to the Study screen.*/}
              Study
            </Link>
            <button
              type="button"
              className="btn btn-danger m-1"
              onClick={() => handleDelete(id)}
            >
               {/* Clicking the “Delete” button shows a warning message before deleting the deck.*/} 
              Delete
            </button>
          </div>
        </div>
    );
  });

  return (
    <div>
      <Link to="/decks/new">
        <button type="button" className="btn btn-primary">
            {/* A "Create Deck" button is shown and clicking it brings the user to the Create Deck screen.*/}
          Create Deck
        </button>
      </Link>
      {deckList}
    </div>
  );
}

export default Home;
