import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout, userUpdateProfileAction } from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Row, Form, Col, Button } from 'react-bootstrap'
import { Image } from 'cloudinary-react';
import axios from 'axios'

const UserProfileScreen = ({history}) => {

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo, loading, error } = userLogin

    const [firstName,setFirstName] = useState(userInfo.firstName)
    const [lastName,setLastName] = useState(userInfo.lastName)
    const [email,setEmail] = useState(userInfo.email)
    const [password,setPassword] = useState(userInfo.password)
    const [confirmPassword,setConfirmPassword] = useState(userInfo.password)
    const [message,setMessage] = useState(null)
    const [image, setImage] = useState(null)
    const [imageUrl, setImageUrl] = useState(userInfo.imageUrl)
    const [servicesOffered, setServicesOffered] = useState(userInfo.servicesOffered)

    useEffect(() => {
        if(!userInfo){
            history.push('/login')
        }
    }, [dispatch, history])

    const uploadImage = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("file", image)
        formData.append('upload_preset', 'smartcal')

        await axios.post('https://api.cloudinary.com/v1_1/vschalamolu9/image/upload', formData).then((res) => {
            setImageUrl(res.data.secure_url)
        })
    }

    const validateEmail = (enteredEmail) => {
        let re = /\S+@\S+\.\S+/;
        return re.test(enteredEmail);
    }


    const submitHandler = async () => {
        if(!validateEmail(email)){
            setMessage('Please enter a valid email')
        }
        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        }
        else{
            dispatch(userUpdateProfileAction(userInfo.id, firstName, lastName, email, password, imageUrl, servicesOffered))
            history.push('/')
        }
    }

    return(
        <>
            <h1>{userInfo.firstName}'s Profile</h1>
            { loading ? <Loader /> : error ? <Message>{error}</Message> : (
                <Row>
                    <Col>
                        <br/>
                        {imageUrl && <Image style={{width: 300, marginLeft: 20}} cloudName='vschalamolu9' public_id={imageUrl} fluid rounded/>}
                    </Col>
                    <Col md={1} />
                    <Col md={6}>
                        <Form onSubmit={submitHandler}>
                            <Form.Group controlId='image' as = {Row}>
                                <Form.Control
                                    type='file'
                                    onChange={(e) => setImage(e.target.files[0])}
                                />
                                <Button style={{marginTop: 20}} type='btn' className='btn-block btn-dark' onClick={uploadImage}><b>Upload Profile Picture</b></Button>
                            </Form.Group>
                            <Form.Group controlId='firstName'>
                                <Form.Label> First Name:</Form.Label>
                                <Form.Control type="text" placeholder="Enter your first name" value={firstName} onChange={(e)=>setFirstName(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='lastName'>
                                <Form.Label> Last Name:</Form.Label>
                                <Form.Control type="text" placeholder="Enter your last name" value={lastName} onChange={(e)=>setLastName(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='email'>
                                <Form.Label> Email:</Form.Label>
                                <Form.Control type="email" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='password'>
                                <Form.Label> Password:</Form.Label>
                                <Form.Control type="password" placeholder="Enter your password" value={password} onChange={(e)=>setPassword(e.target.value)}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='ConfirmPassword'>
                                <Form.Label> Confirm Password:</Form.Label>
                                <Form.Control type="password" placeholder="Confirm your password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}></Form.Control>
                            </Form.Group>
                            {userInfo.freelancer && <Form.Group controlId='ServicesOffered'>
                                <Form.Label> Services Offered:</Form.Label>
                                <Form.Control type="text" placeholder="Services Offered" value={servicesOffered} onChange={(e)=>setServicesOffered(e.target.value)}></Form.Control>
                            </Form.Group>}
                            <Button type='submit'variant="primary">
                                Update
                            </Button>
                        </Form>
                    </Col>
                    <Col md={2} />
                </Row>
            )}
        </>
    )
}

export default UserProfileScreen