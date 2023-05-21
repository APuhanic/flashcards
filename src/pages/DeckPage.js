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
  const [image, setImage] = useState("");
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

  async function handleAddNewCard(e) {
    e.preventDefault();
    try {
      let image = null;
      if (file != null) {
        const path = `/${currentUser.uid}/${file.name}`;
        const storageRef = ref(storage, path);
        const uploadTask = uploadBytesResumable(storageRef, file);
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        image = downloadURL;
        console.log(image);
        setFile(null);
      }

      addCard(deck.id, answer, question, image);
      setFlashcards((prevFlashcards) => {
        return [...prevFlashcards, { answer, question, image }];
      });
      setQuestion("");
      setAnswer("");
      fileRef.current.value = null;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (currentUser) {
      getCards(deck.id).then((res) => {
        setFlashcards(res);
      });
    }
  }, [currentUser]);

  return (
    <>
      <Container className="w-75 justify-content-center">
        <div className="StartStudyingButton text-center mb-3">
          <Button size="lg" onClick={startStudying}>
            {" "}
            Start studying{" "}
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
              <Container>
                <Row>
                  <Col></Col>
                  <Col>
                    <Button
                      disabled={question.length === 0}
                      variant="primary"
                      className="mt-3 mb-3 add-card"
                      type="submit"
                    >
                      Add Card
                    </Button>
                    <input
                      id="file-input"
                      type="file"
                      ref={fileRef}
                      onChange={handleImageAsFile}
                      className="input"
                    />
                  </Col>
                </Row>
              </Container>
            </Form>
          </Card.Body>
        </Card>
        <Container className="w-75 justify-content-center">
          {flashcards && <FlashcardList flashcards={flashcards} />}
        </Container>
      </Container>
    </>
  );
}
