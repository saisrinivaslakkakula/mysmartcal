import React,{useState,useEffect} from 'react'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {getUserDetails} from '../actions/userActions'
const ProfileScreen = ({history}) => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [field4,setField4] = useState('')
    const [field5,setField5] = useState('')
    const [message,setMessage] = useState(null)
    const dispatch = useDispatch()
    const userDetails = useSelector(state => state.userDetails) 
    const {user,loading,error} = userDetails
    const userLogin = useSelector(state => state.userLogin) 
    const {userInfo} = userLogin
    useEffect(() =>{
        if(!userInfo){
            history.push('/login')
        }
        else{
            
           if(!user.email){
               dispatch(getUserDetails('profile'))
           }
           else{
            
               setName(user.firstName)
               setEmail(user.email)     
           }
        }
    },[dispatch,history,user,userInfo])
    const submitHandler = (e)=>{
        e.preventDefault()
        if(password!== confirmPassword)
          setMessage("Passwords Do Not Match")
        else{
            //dispatch action
        }

    }
    return (
        <Row>
            <Col md={3}>
            <h2>User Profile </h2>
            {message && <Message variant='danger'>{message}</Message>}
            {error&& <Message variant='danger'>{error}</Message>}
            {loading&& <Loader></Loader>}
            <Form onSubmit = {submitHandler}>
            <Form.Group controlId='name'>
                    <Form.Label> Name:</Form.Label>
                    <Form.Control type="name" placeholder="Enter your name" value={name} onChange={(e)=>setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label> Email:</Form.Label>
                    <Form.Control type="email" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label> Password:</Form.Label>
                    <Form.Control type="password" placeholder="Enter your pasword" value={password} onChange={(e)=>setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='Confirmpassword'>
                    <Form.Label> Password:</Form.Label>
                    <Form.Control type="password" placeholder="Confirm your pasword" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='Confirmpassword'>
                    <Form.Label> Field1:</Form.Label>
                    <Form.Control type="text" placeholder="Confirm your f1" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='Confirmpassword'>
                    <Form.Label> Field2:</Form.Label>
                    <Form.Control type="text" placeholder="Confirm your f1" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='Confirmpassword'>
                    <Form.Label> Field3:</Form.Label>
                    <Form.Control type="text" placeholder="Confirm your f1" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='Confirmpassword'>
                    <Form.Label> Field4:</Form.Label>
                    <Form.Control type="text" placeholder="Confirm your f1" value={field4} onChange={(e)=>setField4(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='Confirmpassword'>
                    <Form.Label> Field5:</Form.Label>
                    <Form.Control type="text" placeholder="Confirm your f1" value={field5} onChange={(e)=>setField5(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type='submit'variant="primary">
                    Update
                </Button>
            </Form>

            </Col>
            
        </Row>
    )
}

export default ProfileScreen
