import React from 'react'
import { useParams } from 'react-router-dom'

export default function DeckPage() {
    const deck = useParams();
    console.log(deck.deckName)

    return (
        <>
            
        </>
    )
}
