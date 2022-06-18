import React from 'react'
import { useState, useRef } from 'react'
import Decks from './Decks'

export default function Classes() {
    const [decks, setDecks] = useState()
    const deckName = useRef()
    return (
        <>
            {decks && <Decks decks={decks} />}

asdfasdf
        </>
    )
}
