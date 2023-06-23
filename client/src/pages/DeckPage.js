import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Form, Button, Container, Row, Col } from "react-bootstrap";
import { addCard, getCards } from "../firebase/firebasedb";
import { useAuth } from "../contexts/authContext";
import FlashcardList from "../components/FlashcardList";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

export default function DeckPage() {
  const deck = useParams();
  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [file, setFile] = useState(null);
  const handleImageAsFile = (e) => {
    setFile(e.target.files[0]);
  };
  const storage = getStorage();
  const fileRef = useRef();
  const [flashcards, setFlashcards] = useState([]);
  const { currentUser } = useAuth();

  const navigate = useNavigate();

  function startStudying() {
    navigate(`/Home/${deck.id}/studying`);
  }

  function onDeckChange() {
    if (currentUser) {
      getCards(currentUser.uid,deck.id).then((res) => {
        setFlashcards(res);
      });
    }
  }

  async function handleAddNewCard(e) {
    e.preventDefault();
    try {
      let image = null;
      if (file != null) {
        const path = `/${currentUser.uid}/${file.name}`;
        const storageRef = ref(storage, path);
        const uploadTask = await uploadBytesResumable(storageRef, file);
        const snapshot = await uploadTask;
        const downloadURL = await getDownloadURL(snapshot.ref);
        image = downloadURL;
        console.log(image);
        setFile(null);
      }

      const newCard = { answer, question, image };
      await addCard(currentUser.uid,deck.id, newCard.answer, newCard.question, newCard.image);

      onDeckChange();
      setQuestion("");
      setAnswer("");
      fileRef.current.value = null;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (currentUser) {
      getCards(currentUser.uid,deck.id).then((res) => {
        setFlashcards(res);
      });
    }
  }, [currentUser]);

  return (
    <>
      <Container className="w-75 justify-content-center">
        <div className=" text-center mb-3">
          <Button size="lg" onClick={startStudying}>
            Start studying
          </Button>
        </div>
        <Card className="d-flex justify-content-center">
          <Card.Body>
            <Form onSubmit={handleAddNewCard}>
              <Form.Group id="question">
                <Form.Control
                  as="textarea"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Question"
                  required
                />
              </Form.Group>
              <Form.Group id="answer" className="mt-3">
                <Form.Control
                  as="textarea"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Answer"
                  required
                />
              </Form.Group>
              <Form.Group id="image" className="mt-3">
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImageAsFile}
                  ref={fileRef}
                />
              </Form.Group>
              <Button className="w-100 mt-3" type="submit">
                Add New Card
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <Row className="mt-3">
          <Col>
            <FlashcardList
              flashcards={flashcards}
              onDeckChange={onDeckChange}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}
