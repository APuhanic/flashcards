import React, { useState, useEffect } from "react";
import { Button, Container, ButtonGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import { getCards, changeGrade } from "../firebase/firebasedb";
import StudyCard from "../components/StudyCard";

export default function Studying() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentCard, setCurrentCard] = useState(0);
  const {currentUser} = useAuth();
  const deck = useParams();
  const shuffledFlashcards = flashcards.sort(() => Math.random() - 0.5);
  const StudyCards = shuffledFlashcards.map((flashcard) => {
    return <StudyCard flashcard={flashcard} />;
  });

  useEffect(() => {
    if (currentUser) {
      getCards(currentUser.uid,deck.id).then((res) => {
        setFlashcards(res);

      });
    }
  }, [currentUser]);

  function updateCards() {
    getCards(currentUser.uid,deck.id).then((res) => {
      setFlashcards(res);
    });
  }

  function nextQuestion(event, param) {
    changeGrade(currentUser.uid,deck.id, flashcards[currentCard], param);
    updateCards();
    const nextCard = currentCard + 1;
    if (nextCard < StudyCards.length) {
      setCurrentCard(nextCard);
    } else {
      setCurrentCard(0);
    }
  }

  return (
    <>
      <Container className="justify-content-center" style={{ height: "350px" }}>
        {StudyCards[currentCard]}
        <div className="d-flex justify-content-center review-buttons sticky-bottom">
          <ButtonGroup
            className="me-2 align-center w-100"
            size="lg gap-2"
            aria-label="First group"
          >
            <Button variant="one" onClick={(event) => nextQuestion(event, 1)}>
              1
            </Button>
            <Button variant="two" onClick={(event) => nextQuestion(event, 2)}>
              2
            </Button>
            <Button
              variant="three"
              onClick={(event) => nextQuestion(event, 3)}
            >
              3
            </Button>{" "}
            <Button variant="four" onClick={(event) => nextQuestion(event, 4)}>
              4
            </Button>
            <Button variant="five" onClick={(event) => nextQuestion(event, 5)}>
              5
            </Button>
          </ButtonGroup>
        </div>
      </Container>
    </>
  );
}
