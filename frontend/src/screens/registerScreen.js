import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col, InputGroup, FormControl } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { login, register } from '../actions/userActions'
import FormContainer from '../components/formContainer'
const RegisterScreen = ({ location, history }) => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [streetName, setStreetName] = useState('')
    const [aptNumber, setAptNumber] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [isFreeLancer, setIsFreelancer] = useState(false)
    const [message, setMessage] = useState(null)
    const redirect = location.search ? location.search.split("=")[1] : '/'
    const dispatch = useDispatch()
    const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Federated States of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']
    const userRegister = useSelector(state => state.userRegister)

    const { userInfo, loading, error } = userRegister
    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword)
            setMessage("Passwords Do Not Match")
        else {
            const Address = {
                streetName: streetName,
                appartmentNumber: aptNumber,
                city: city,
                state: state,
                zipCode: zipCode
            }
            let isFreeLancerBoolean = false
            if (isFreeLancer) {
                isFreeLancerBoolean = true
            }

            dispatch(register(firstName, lastName, email, phoneNumber, password, Address, isFreeLancerBoolean))
        }

    }
    return (
        <FormContainer>
            <h1>Sign Up </h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader></Loader>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='firstName'>
                    <Form.Label> First Name:</Form.Label>
                    <Form.Control type="name" required placeholder="Enter your first name" vlaue={firstName} onChange={(e) => setFirstName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='lastName'>
                    <Form.Label> Last Name:</Form.Label>
                    <Form.Control type="name" required placeholder="Enter your last name" vlaue={lastName} onChange={(e) => setLastName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label> Email:</Form.Label>
                    <Form.Control type="email" required placeholder="Enter your email" vlaue={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='phone'>
                    <Form.Label> Phone:</Form.Label>
                    <Form.Control type="tel" required placeholder="Enter your phone number" vlaue={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label> Password:</Form.Label>
                    <Form.Control type="password" required placeholder="Enter your pasword" vlaue={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='Confirmpassword'>
                    <Form.Label> Confirm Password:</Form.Label>
                    <Form.Control type="password" required placeholder="Confirm your pasword" vlaue={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='StrretName'>
                    <Form.Label> Address Line 1:</Form.Label>
                    <Form.Control type="text" required placeholder="Enter Street Name" vlaue={streetName} onChange={(e) => setStreetName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='Address Line 2'>
                    <Form.Label> Address Line 2:</Form.Label>
                    <Form.Control type="text" placeholder="Apt/Suite number" vlaue={aptNumber} onChange={(e) => setAptNumber(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='City'>
                    <Form.Label> City:</Form.Label>
                    <Form.Control type="text" required placeholder="Enter City" vlaue={city} onChange={(e) => setCity(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='State'>
                    <Form.Label> State:</Form.Label>
                    <Form.Control as="select" required vlaue={state} onChange={(e) => setState(e.target.value)}>
                        {states.map((state) => (
                            <option value={state}>{state}</option>
                        ))}

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='ZipCode'>
                    <Form.Label> ZipCode:</Form.Label>
                    <Form.Control type="text" required placeholder="Enter ZipCode" vlaue={zipCode} onChange={(e) => setZipCode(e.target.value)}></Form.Control>
                </Form.Group>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-default">Are you a freelancer?</InputGroup.Text>
                    <InputGroup.Checkbox aria-label="Checkbox for following text input" onChange={(e) => setIsFreelancer(e.target.value)} />

                </InputGroup>
                {message && <Message variant='danger'>{message}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                <Button type='submit' variant="primary">
                    Sign Up
                </Button>
            </Form>
            <Row className="py-3">
                <Col>
                    Already Customer?
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Login Here
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
