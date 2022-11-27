import React from 'react'
import {Button, Card, ListGroup } from 'react-bootstrap'
import Rating from "./Rating";
import { Link } from 'react-router-dom'

const Freelancer = ({freelancer}) => {

    return (
        <Card className='my-3 p-3 rounded'>
            <a href = {`/freelancer/${freelancer.id}`}>
                <Card.Img src = {freelancer.image} variant='top'/>
            </a>
            <Card.Body>
                <a href = {`/freelancer/${freelancer.id}`}>
                    <Card.Title as='div'>
                        <strong>{freelancer.firstName}</strong>
                    </Card.Title>
                </a>
            </Card.Body>
            <Card.Text as='div'>
                <Rating rating={freelancer.rating} numreviews={freelancer.numReviews}/>
            </Card.Text>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <Button className='btn-block' type='button'>Message</Button>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Link to='/calendar'>
                        <Button className='btn-block' type='button'>Open Calender</Button>
                    </Link>
                </ListGroup.Item>
            </ListGroup>
        </Card>
    )
}

export default Freelancer