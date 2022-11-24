
import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Row,Col} from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getAllSlots } from '../actions/CalendarActions';
import { getUserNotifications } from '../actions/userActions';
const Homescreen = () => {
   
   const dispatch = useDispatch()
   const userid = useSelector(state => state.userLogin.userInfo.id)

   

    useEffect(()=>{
        dispatch(getAllSlots(userid))
       // dispatch(getUserNotifications(userid))
    
    },[dispatch])


   
    return (
        <>
         <h1> Dashboard</h1> 
         <Row>
         This is Dashboard page
         {/* 
         add a hyperlink to calendar page
         */}
         <Col>
            <a href="/calendar">Calendar</a>
         </Col>
        </Row>
            
            
        </>
    )
}

export default Homescreen
