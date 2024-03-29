import React from "react";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "../contexts/authContext";
import { Button, Container, Form } from "react-bootstrap";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import app from "../firebase/firebase";
import { getAuth } from "firebase/auth";
import { getDecks } from "../firebase/firebasedb";
import { useNavigate } from "react-router-dom";
import DeckList from "../components/DeckList";
import { addDeck } from "../firebase/firebasedb";
import { Card, Row, Col } from "react-bootstrap";
const db = getFirestore(app);

export default function Home() {
  const [decks, setDecks] = useState([]);
  const { currentUser } = useAuth();
  const auth = getAuth();
  const navigate = useNavigate();
  const deckNameRef = useRef();

  function onDeckClick(deck) {
    navigate(`/Home/${deck}`);
  }
  function onChange() {
    if (currentUser) {
      getDecks(currentUser.uid).then((res) => {
        setDecks(res);
      });
    }
  }
  async function createUser() {
    try {
      setDoc(doc(db, "users", auth.currentUser.uid), {
        email: currentUser.email,
      });
    } catch (error) {
      console.log(error);
    }
  }
  function HandleNewDeck(e) {
    e.preventDefault();
    createUser();
    try {
      addDeck(currentUser.uid,deckNameRef.current.value);
    } catch (error) {
      console.log(error);
    }
    navigate(`/Home/${deckNameRef.current.value}`);
  }

  useEffect(() => {
    if (currentUser) {
      getDecks(currentUser.uid).then((res) => {
        setDecks(res);
      });
    }
  }, [currentUser]);

  return (
    <>
      <Container className=" w-75 justify-content-center">
        <Card className="d-flex ">
          <Card.Body>
            <Form onSubmit={HandleNewDeck}>
              <Form.Group id="deckName">
                <Form.Control
                  placeholder="Deck name ..."
                  ref={deckNameRef}
                  required
                />
              </Form.Group>
              <Button variant="primary" className="mt-3 mb-3" type="submit">
                Create Deck
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <Container>
          <Row className="d-flex justify-content-center">
            <Col xs lg="8">
              {decks && (
                <DeckList
                  decks={decks}
                  onDeckClick={onDeckClick}
                  onChange={onChange}
                />
              )}
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
}
