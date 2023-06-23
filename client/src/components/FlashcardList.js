import React from "react";
import Flashcard from "./Flashcard";

export default function FlashcardList({ flashcards, onDeckChange }) {
  return flashcards.map((flashcard) => {
    return (
      <Flashcard key={flashcard.id} flashcard={flashcard} onDeckChange={onDeckChange} />
    );
  });
}
