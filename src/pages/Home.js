import React from 'react'

import { useState, useRef, useEffect } from 'react'
import { useAuth } from "../contexts/authContext";
import { Button, Form } from 'react-bootstrap';
import { getFirestore, collection, setDoc, doc, getDoc, getDocs, addDoc, deleteDoc } from "firebase/firestore"
import app from '../firebase/firebase'
import { getAuth } from "firebase/auth";
import { getDeck } from '../firebase/firebasedb';
import { useNavigate, useParams } from 'react-router-dom';
import DeckList from '../components/DeckList';
import { addDeck } from '../firebase/firebasedb';
import { Card } from 'react-bootstrap';

const db = getFirestore(app)

export default function Home() {
  const [decks, setDecks] = useState([]);
  const usersCollectionRef = collection(db, "users");
  const { currentUser } = useAuth();
  const auth = getAuth();
  const userID = useParams();
  const navigate = useNavigate();
  const deckNameRef = useRef();
  const [NewDeckName, setNewDeckName] = useState("");

  function onDeckClick(deck) {
    console.log(deck)
    navigate(`/Home/${deck}`);
  }

  async function createUser() {
    try {
      setDoc(doc(db, "users", auth.currentUser.uid), {
        email: currentUser.email
      })

    }
    catch (error) {
      console.log(error)
    }
  }
  function HandleNewDeck(e) {
    e.preventDefault()
    createUser()
    try {
      addDeck(deckNameRef.current.value);
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (currentUser) {
      getDeck().then((res) => {
        setDecks(res);
      })
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      getDeck().then((res) => {
        setDecks(res);
      })
    }
  }, [decks]);
  return (
    <>
      <Card className='d-flex w-75 justify-content-center'>
        <Card.Body>
          <Form onSubmit={HandleNewDeck} >
            <Form.Group id="deckName">
              <Form.Control placeholder="Deck Name" ref={deckNameRef} onChange={(e) => setNewDeckName(e.target.value)} required />
            </Form.Group>
            <Button variant="primary" className='mt-3 mb-3' type="submit">Create Deck</Button>
          </Form>
        </Card.Body>

      </Card>

      <div className='w-75'>
        {decks && <DeckList decks={decks} onDeckClick={onDeckClick} />}
      </div>
    </>
  )

}
