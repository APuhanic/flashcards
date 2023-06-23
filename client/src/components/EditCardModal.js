import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useState } from "react";
export default function EditCardModal({
  showModal,
  handleCloseModal,
  flashcard,
  handleEditCard,
}) {
  const [question, setQuestion] = useState(flashcard.question);
  const [answer, setAnswer] = useState(flashcard.answer);

  return (
    <>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Card</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group id="question">
              <Form.Control
                as="textarea"
                defaultValue={flashcard.question}
                onChange={(e) => {
                  setQuestion(e.target.value);
                }}
                placeholder="Question"
              />
            </Form.Group>
            <Form.Group id="answer" className="mt-3">
              <Form.Control
                as="textarea"
                defaultValue={flashcard.answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Answer"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => handleEditCard(question, answer)}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
