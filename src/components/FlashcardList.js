import React from 'react'
import Flashcard from './Flashcard'

export default function FlashcardList({flashcards}) {
  return (
    flashcards.map(flashcard=>{
        return <Flashcard key={flashcard.id} flashcard={flashcard}/>
    })
  )
}
