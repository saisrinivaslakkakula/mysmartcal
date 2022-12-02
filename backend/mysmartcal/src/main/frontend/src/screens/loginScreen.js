import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {login} from '../actions/userActions'
import FormContainer from '../components/formContainer'
const LoginScreen = ({location,history}) => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const redirect = location.search? location.search.split("=")[1]:'/'
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin) // sue selector is used to get the part of the state from the state object; the state might contain states of objects from different screens as well.
    // State is like a central ledger of all values of objects of screens.
    // from the state, select useLogin part of the state and put it in the variable called userLogin

    const {userInfo,loading,error} = userLogin
    // from the userLogin varibale obtained from the state, take current values of error, loading and userInfo

    /* useEffect is the function in react which is typically used to redirect or change the content of the page
     whenever the state of a particular state object changes.
     In this case, we need to redirect when the userInfo Changes. By default it will be blank and after the 
     successful authentication, the content of the page must change by redirecting it to the products page

     useEffect takes the dependencies as an array. here userInfo is the dependency. i.e if it change use effect must be triggered.

     */
    useEffect(() =>{
        if(userInfo){
            history.push(redirect)
        }
    },[history,userInfo,redirect])

    const submitHandler = (e)=>{
        e.preventDefault()
        dispatch(login(email,password))

    }
    return (
        <FormContainer>
            <h1>Sign in </h1>
            {error&& <Message variant='danger'>{error}</Message>}
            {loading&& <Loader></Loader>}
            <Form onSubmit = {submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label> Email:</Form.Label>
                    <Form.Control type="email" placeholder="Enter your email" vlaue={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label> Password:</Form.Label>
                    <Form.Control type="password" placeholder="Enter your pasword" vlaue={password} onChange={(e)=>setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type='submit'variant="primary">
                    Sign In
                </Button>
            </Form>
            <Row className="py-3">
                <Col>
                New Customer? 
                <Link to={redirect?`/register?redirect=${redirect}`:'/register'}>
                     Register Here
                </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen
