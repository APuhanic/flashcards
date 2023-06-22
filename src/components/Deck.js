import React, { useState, useEffect } from "react";
import { ListGroup, Container, Row, Col, Image } from "react-bootstrap";
import { useAuth } from "../contexts/authContext";
import { getCards, deleteDeck } from "../firebase/firebasedb";
export default function Deck({ deck, onClick, onChange }) {
  const [flashcards, setFlashcards] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      getCards(deck.id).then((res) => {
        setFlashcards(res);
      });
    }
  }, [currentUser]);

  async function handleDeckDelete() {
    await deleteDeck(deck.id);
    onChange();
  }

  return (
    <ListGroup>
      <ListGroup.Item action className="mt-2 deck">
        <Container fluid>
          <Row>
            <Col onClick={(_) => onClick(deck.deckName)}>
              <b className="deck-name">{deck.deckName}</b>
            </Col>
            <Col>
              <span className="text-black-50">{flashcards.length} cards</span>{" "}
            </Col>
            <Col>
              <span
                style={{
                  float: "right", 
                }}
                onClick={handleDeckDelete}
              >
                <Image src={require("../delete.png")} className="delete-icon" />
              </span>{" "}
            </Col>
          </Row>
        </Container>
      </ListGroup.Item>
    </ListGroup>
  );
}
