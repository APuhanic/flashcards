import React, { useState } from "react";
import { Card, Container, Row, Col, Image } from "react-bootstrap";
import { deleteCard, editCard } from "../firebase/firebasedb";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import DropdownMenu from "./DropdownMenu";
import EditCardModal from "./EditCardModal";
export default function Flashcard({ flashcard, onDeckChange }) {
  const deck = useParams();
  const deckID = deck.id;
  const flashcardID = flashcard.id;
  const [styles, setStyles] = useState();
  const [showModal, setShowModal] = useState(false); // State for controlling the modal
  const styles1 = {
    borderStyle: "solid ",
    borderWidth: "0 0 5px",
    borderColor: "rgba(240, 58, 58)",
  };
  const styles2 = {
    borderStyle: "solid ",
    borderWidth: "0 0 5px",
    borderColor: "rgb(242, 145, 41)",
  };
  const styles3 = {
    borderStyle: "solid ",
    borderWidth: "0 0 5px",
    borderColor: "rgb(231, 199, 40)",
  };
  const styles4 = {
    borderWidth: "0 0 5px",
    borderStyle: "solid ",
    borderColor: "rgb(56, 162, 56)",
  };
  const styles5 = {
    borderStyle: "solid ",
    borderColor: "rgb(45, 85, 177)",
    borderWidth: "0 0 5px",
  };

  async function handleDelete() {
    try {
      await deleteCard(deckID, flashcardID);
      console.log("Card deleted");
      onDeckChange();
    } catch (error) {
      console.log(error);
    }
  }
  async function handleEditCard(question, answer) {
    await editCard(deckID, flashcardID, question, answer);
    setShowModal(false); // Close the modal
    onDeckChange();
  }
  async function handleEdit() {
    setShowModal(true); // Open the modal when "Edit" is clicked
  }

  function handleCloseModal() {
    setShowModal(false); // Close the modal
  }

  useEffect(() => {
    if (flashcard.grade === 1) {
      setStyles(styles1);
    }
    if (flashcard.grade === 2) {
      setStyles(styles2);
    }
    if (flashcard.grade === 3) {
      setStyles(styles3);
    }
    if (flashcard.grade === 4) {
      setStyles(styles4);
    }
    if (flashcard.grade === 5) {
      setStyles(styles5);
    }
  }, [flashcard.grade]);

  return (
    <>
      <div className="flashcard">
        <Card className="mt-3 mb-3" style={styles}>
          <Card.Body>
            <Container>
              <Row>
                <Col>
                  <Row>
                    <Col>
                      <span className="text-black-50 bold"></span>{" "}
                      <b>{flashcard.question}</b>
                      <hr />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <span className="text-black-50 "></span>{" "}
                      {flashcard.answer}
                    </Col>
                  </Row>
                  <Row>
                    <Col className="flashcardImage">
                      <Image
                        src={flashcard.image}
                        style={{ maxHeight: 500, maxWidth: 500 }}
                      />
                    </Col>
                  </Row>
                </Col>
                <Col xs={1}>
                  <Row>
                    <DropdownMenu
                      handleDelete={handleDelete}
                      handleEdit={handleEdit}
                    />
                  </Row>
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>
      </div>
      <EditCardModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        flashcard={flashcard}
        handleEditCard={handleEditCard}
      />
    </>
  );
}
