import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Dashboard from './Dashboard'
import { getAllSlots } from '../actions/CalendarActions';

const Homescreen = () => {
   
   const dispatch = useDispatch()
   const userLogin = useSelector(state => state.userLogin)
   const { userInfo } = userLogin

    if(!userInfo){
        window.location.href = '/login'
    }

    useEffect(()=>{
        dispatch(getAllSlots(userInfo.id))
    
    },[dispatch])


   
    return (
        <>
         <h1> Dashboard</h1>
         <Dashboard />
        </>
    )
}

export default Homescreen
