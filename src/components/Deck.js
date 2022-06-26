import React from 'react'
import { ListGroup, Container, Row, Col } from 'react-bootstrap'

export default function Deck({ deck, onClick }) {
  return (
    <ListGroup className='mt-2' onClick={_ => onClick(deck.deckName)}>
      <ListGroup.Item action>
        <Container fluid>
          <Row>
            <Col>{deck.deckName}</Col>
          </Row>
        </Container>
      </ListGroup.Item>
    </ListGroup>
  )
}

