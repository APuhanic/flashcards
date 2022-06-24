import React from 'react'
import { ListGroup, Container, Row, Col } from 'react-bootstrap'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'

export default function Deck({ deck, onClick }) {
    return (
        <ListGroup className='mt-2' onClick={_=>onClick(deck.deckName)}>
            <ListGroup.Item action>
                <Container fluid>
                    <Row>
                        <Col>{deck.deckName}</Col>
                        <Col>//</Col>
                    </Row>
                </Container>
            </ListGroup.Item>
        </ListGroup>
    )
}

