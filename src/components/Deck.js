import React, { useState, useEffect } from "react";
import { ListGroup, Container, Row, Col } from "react-bootstrap";
import { useAuth } from "../contexts/authContext";
import { getCards } from "../firebase/firebasedb";

export default function Deck({ deck, onClick }) {
  const [flashcards, setFlashcards] = useState([]);
  const { currentUser } = useAuth();
  useEffect(() => {
    if (currentUser) {
      getCards(deck.id).then((res) => {
        setFlashcards(res);
      });
    }
  }, [currentUser]);
  return (
    <ListGroup onClick={(_) => onClick(deck.deckName)}>
      <ListGroup.Item action className=" mt-2">
        <Container fluid>
          <Row>
            <Col><b>{deck.deckName}</b></Col>
            <Col>
              <span className="text-black-50 ">{flashcards.length} cards</span>{" "}
            </Col>
          </Row>
        </Container>
      </ListGroup.Item>
    </ListGroup>
  );
}
