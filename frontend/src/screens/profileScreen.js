import React,{useState,useEffect} from 'react'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {getUserDetails} from '../actions/userActions'
import { Image } from 'cloudinary-react'
import axios from 'axios'

const ProfileScreen = ({history}) => {
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [field4,setField4] = useState('')
    const [field5,setField5] = useState('')
    const [message,setMessage] = useState(null)
    const [image, setImage] = useState(null)
    const [imageUrl, setImageUrl] = useState(userInfo.imageUrl)
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
               dispatch(getUserDetails(userInfo.id))
           }
           else{
            
               setName(user.firstName)
               setEmail(user.email)     
           }
        }
    },[dispatch,history,user,userInfo])

    const uploadImage = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("file", image)
        formData.append('upload_preset', 'smartcal')

        await axios.post('https://api.cloudinary.com/v1_1/vschalamolu9/image/upload', formData).then((res) => {
            setImageUrl(res.data.secure_url)
        })
    }

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
                <br/>
                {imageUrl && <Image style={{width: 300, marginLeft: 20}} cloudName='vschalamolu9' public_id={imageUrl} fluid rounded/>}
            {message && <Message variant='danger'>{message}</Message>}
            {error&& <Message variant='danger'>{error}</Message>}
            {loading&& <Loader></Loader>}
            <Form onSubmit = {submitHandler}>
                <Form.Group controlId='image' as = {Row}>
                    <Form.Control
                        type='file'
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                    <Button style={{marginTop: 20}} type='btn' className='btn-block btn-dark' onClick={uploadImage}><b>Upload Profile Picture</b></Button>
                </Form.Group>
                <br/>
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
