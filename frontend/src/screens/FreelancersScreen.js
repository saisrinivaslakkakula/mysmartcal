import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Row, Form } from 'react-bootstrap'
import { getAllFreelancers } from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FreelancersList from "../components/FreelancersList";

const FreelancersScreen = ({history}) => {

    const [query, setQuery] = useState("");
    const dispatch = useDispatch()
    const keys = ["firstName", "lastName", "email"]

    useEffect(() => {
        dispatch(getAllFreelancers())
    }, [dispatch])

    const freelancersList = useSelector((state) => state.freelancersList)
    const { freelancers, loading, error } = freelancersList

    const search = (freelancers) => {
        return freelancers.filter((f) => keys.some((key) => f[key].toLowerCase().includes(query)))
    }

    return(
        <>
            <h1>Freelancers Page</h1>
            <Form>
                <Form.Group className="md-6" controlId="formGroupSearch">
                    <Form.Control type="text" placeholder="Search..." onChange={(e) => setQuery(e.target.value.toLowerCase())}/>
                </Form.Group>
            </Form>
            { loading ? <Loader /> : error ? <Message>{error}</Message> : (<Row>
                <FreelancersList freelancers={search(freelancers)}/>
            </Row>)}
        </>
    )
}

export default FreelancersScreen;