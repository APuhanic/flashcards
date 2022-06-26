import React, { useState, useEffect } from 'react'
import { Button, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { getCards } from '../firebase/firebasedb';
import Flashcard from '../components/Flashcard';

export default function studying() {
  const [flashcards, setFlashcards] = useState([]);
  const [currentCard, setCurrentCard] = useState(0);
  const currentUser = useAuth();
  const deck = useParams();
  const StudyCards = flashcards.map(flashcard => {
    return <Flashcard flashcard={flashcard}></Flashcard>
  })

  useEffect(() => {
    if (currentUser) {
      getCards(deck.id).then((res) => {
        setFlashcards(res);
      })
    }
  }, [currentUser]);

  function nextQuestion() {
    const nextCard = currentCard + 1;
    if (nextCard < StudyCards.length) {
      setCurrentCard(nextCard)
    } else {
      setCurrentCard(0)
    }
  }

  return (
    <>
      <Container >
        <div className='h-100'>
          {StudyCards[currentCard]}
          <div className="desno">
            <Button onClick={nextQuestion} size="lg">Next</Button>
          </div>
        </div>
      </Container>
    </>
  )
}
