import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Card, Form, Button, Container } from 'react-bootstrap';
import { addCard, getCards } from '../firebase/firebasedb';
import { useAuth } from '../contexts/authContext';
import FlashcardList from '../components/FlashcardList';

export default function DeckPage() {
  const deck = useParams();
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [flashcards, setFlashcards] = useState([]);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  function startStudying() {
    navigate(`/Home/${deck.id}/studying`);
  }

  function handleAddNewCard(e) {
    e.preventDefault()
    try {
      addCard(deck.id, answer, question)
      setFlashcards(prevFlashcards => {
        return [...prevFlashcards, { answer: answer, question: question }]
      })
      setQuestion("")
      setAnswer("")
    }
    catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (currentUser) {
      getCards(deck.id).then((res) => {
        setFlashcards(res);
      })
    }
  }, [currentUser]);

  return (
    <>
      <Container className='w-75 justify-content-center'>
        <div className='StartStudyingButton text-center mb-3' >
          <Button size="lg" onClick={startStudying}> Start studying </Button>
        </div>
        <Card className='d-flex justify-content-center'>
          <Card.Body>
            <Form onSubmit={handleAddNewCard} >
              <Form.Group id="question">
                <Form.Control as="textarea" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Question" required />
              </Form.Group>
              <Form.Group id="answer" className='mt-3'>
                <Form.Control as="textarea" value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Answer" required />
              </Form.Group>
              <Button disabled={question.length === 0} variant="primary" className='mt-3 mb-3' type="submit">Add Card</Button>
            </Form>
          </Card.Body>
        </Card>
        <Container className='w-75 justify-content-center'>
          {flashcards && <FlashcardList flashcards={flashcards} />}
        </Container>
      </Container>
    </>
  )
}
