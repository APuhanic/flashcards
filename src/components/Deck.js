import React, { useState, useEffect } from "react";
import { ListGroup, Container, Row, Col } from "react-bootstrap";
import { useAuth } from "../contexts/authContext";
import { getCards } from "../firebase/firebasedb";
import { Image } from "react-bootstrap";
import { deleteDeck } from "../firebase/firebasedb";

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
    <ListGroup >
      <ListGroup.Item action className=" mt-2">
        <Container fluid>
          <Row>
            <Col onClick={(_) => onClick(deck.deckName)}>
              <b>{deck.deckName}</b>
            </Col>
            <Col>
              <span className="text-black-50 ">{flashcards.length} cards</span>{" "}
            </Col>
            <Col>
              <button
                style={{ backgroundColor: "transparent", border: "0px" }}
                onClick={handleDeckDelete}
              >
                <Image src={require("../delete.png")} />
              </button>{" "}
            </Col>
          </Row>
        </Container>
      </ListGroup.Item>
    </ListGroup>
  );
}
