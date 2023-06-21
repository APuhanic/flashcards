import React from "react";
import Deck from "./Deck";

export default function DeckList({ decks, onDeckClick, onChange }) {
  return decks.map((deck) => {
    return <Deck key={deck.id} deck={deck} onClick={onDeckClick} onChange={onChange}/>;
  });
}
