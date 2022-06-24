import React from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../contexts/authContext';

export default function DeckPage() {
    const deckName = useParams();
    const { currentUser } = useAuth()
    console.log(deckName)


    return (
        <>

        </>

    )
}
