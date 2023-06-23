import React from "react";
import { Card, Container, Row, Col, Image } from "react-bootstrap";

import { useState, useEffect } from "react";

export default function StudyCard({ flashcard }) {
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

              </Row>
            </Container>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
