import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button } from 'react-bootstrap'
import Rating from "../components/Rating";
import {  getFreelancerDetails } from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const FreelancerScreen = ({match}) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getFreelancerDetails(match.params.id))
    }, [dispatch, match])

    const freelancerDetails = useSelector((state) => state.freelancerDetails)
    const { loading, error, freelancer } = freelancerDetails

    return(
        <>
            <Link className='btn btn-light my-3' to='/freelancers'>
                Go Back
            </Link>
            { loading ? <Loader /> : error ? <Message>{error}</Message> : (
                <Row>
                    <Col md={6}>
                        <Image src={freelancer.imageUrl} alt={freelancer.firstName} fluid/>
                    </Col>
                    <Col md={6}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>{freelancer.firstName}</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating rating={freelancer.firstName} numreviews={freelancer.firstName}/>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Description: {freelancer.firstName}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button className='btn-block' type='button'>
                                    Message
                                </Button>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Link to= {`/freelancerCalendar/${match.params.id}`}>
                                    <Button className='btn-block' type='button'>
                                        Calendar
                                    </Button>
                                </Link>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            )}
        </>
    )
}

export default FreelancerScreen