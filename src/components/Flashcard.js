import React from 'react'
import { Card, Container, Row, Col } from 'react-bootstrap'

export default function Flashcard({ flashcard }) {
  return (
    <>
      <Card className="mt-3 mb-3">
        <Card.Body>
          <Card.Text>
            <Container fluid>
              <Row>
                <Col>Q:{flashcard.question}</Col>
              </Row>
              <Row>
                <Col>A:{flashcard.answer}</Col>
              </Row>
            </Container>
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}
