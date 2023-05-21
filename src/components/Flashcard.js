import React from "react";
import { Card, Container, Row, Col, Button, Image } from "react-bootstrap";
import { deleteCard } from "../firebase/firebasedb";
import { useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";

export default function Flashcard({ flashcard }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const deck = useParams();
  const deckID = deck.id;
  const flashcardID = flashcard.id;
  const [styles, setStyles] = useState();
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

  function handleDelete() {
    try {
      deleteCard(deckID, flashcardID);
      console.log("Card deleted");
      handleShow();
    } catch (error) {
      console.log(error);
    }
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
        <Card className="mt-3 mb-3 " style={styles}>
          <Card.Body>
            <Container>
              <Row>
                <Col>
                  <Card.Text>
                    <Row>
                      <Col>
                        <span className="text-black-50 bold"></span>{" "}
                        <b>{flashcard.question}</b>
                        <hr></hr>
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
                        <Image src={flashcard.image}  style={{maxHeight:500,maxWidth:500}}/>
                      </Col>
                    </Row>
                  </Card.Text>
                </Col>
                <Col xs={1}>
                  <Row>
                    <button
                      style={{ backgroundColor: "transparent", border: "0px" }}
                      onClick={handleDelete}
                    >
                      <Image src={require("../delete.png")} />
                    </button>
                  </Row>
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          This card is deleted and will not appear while studying.
        </Modal.Body>
        <Button variant="warning" onClick={handleClose}>
          Close
        </Button>
      </Modal>
    </>
  );
}
