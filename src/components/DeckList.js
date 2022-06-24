import React from 'react'
import Deck from './Deck'

export default function DeckList({ decks, onDeckClick }) {

    return (
        decks.map(deck=>{
            console.log(deck.deckName)
            return <Deck key={deck.id} deck={deck} onClick={onDeckClick}/>
        })
    )
}
