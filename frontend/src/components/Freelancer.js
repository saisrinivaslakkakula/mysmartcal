import React,{useState} from 'react'
import {Button, Card, ListGroup } from 'react-bootstrap'
import Rating from "./Rating";
import { Link } from 'react-router-dom'
import no_image  from '../no_image.jpg';


const Freelancer = ({freelancer}) => {
    

    return (
        <Card className='my-3 p-3 rounded'>
            <a href = {`/freelancer/${freelancer.id}`}>
                {freelancer.imageUrl ? (<Card.Img src = {freelancer.imageUrl} variant='top'/>) : (<Card.Img src={no_image} variant='top'/>)}
            </a>
            <Card.Body>
                <a href = {`/freelancer/${freelancer.id}`}>
                    <Card.Title as='div'>
                        <strong>{freelancer.firstName}</strong>
                    </Card.Title>
                </a>
            </Card.Body>
            <Card.Text as='div'>
                <Rating rating={'4.5'} numreviews={'5'}/>
            </Card.Text>
            <Card.Text as='div'>
                {freelancer.servicesOffered} developer
            </Card.Text>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <Button className='btn-block' value={freelancer.id} type='button'>Message</Button>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Link to={`/freelancerCalendar/${freelancer.id}`}>
                        <Button className='btn-block' type='button'>Open Calender</Button>
                    </Link>
                </ListGroup.Item>
            </ListGroup>
        </Card>
    )
}

export default Freelancer