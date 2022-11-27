import {USER_LOGIN_REQUEST,USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL, USER_LOGOUT, USER_REGISTER_REQUEST,
     USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_DETAILS_REQUEST, 
     USER_DETAILS_SUCCESS, USER_DETAILS_FAIL,
    GET_USER_NOTIFICATIONS,
    FREELANCERS_LIST_REQUEST,
    FREELANCERS_LIST_SUCCESS,
    FREELANCERS_LIST_FAIL,
    FREELANCER_DETAILS_REQUEST,
    FREELANCER_DETAILS_SUCCESS,
    FREELANCER_DETAILS_FAIL
} from '../constants/userConstants'
import axios from 'axios'
export const login = (email,password) => async(dispatch) =>{
    try {
        dispatch({
            type:USER_LOGIN_REQUEST
        })
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }
        //console.log(config)
        const {data} = await axios.post('/api/user/login',{email,password},config)
        
         dispatch({
            type : USER_LOGIN_SUCCESS,
            payload:data,
        })
        localStorage.setItem('userInfo',JSON.stringify(data)) 
        
    } catch (error) {

         dispatch({
            type:USER_LOGIN_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        }) 
    }
}

export const register = (firstName, lastName, email, phoneNumber, password, Address, isFreeLancer) => async(dispatch) =>{
    try {
        dispatch({
            type:USER_REGISTER_REQUEST
        })
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        }
        console.log(isFreeLancer)
        const {data} = await axios.post('/api/user/add/',{firstName, lastName, email, phoneNumber,password, address:Address, isFreelancer:isFreeLancer},config)
        
         dispatch({
            type : USER_REGISTER_SUCCESS,
            payload:data,
        })
        dispatch({
            type : USER_LOGIN_SUCCESS,
            payload:data,
        })
        localStorage.setItem('userInfo',JSON.stringify(data)) 
        
    } catch (error) {

         dispatch({
            type:USER_REGISTER_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        }) 
    }
}

export const getUserDetails = (id) => async(dispatch,getState) =>{
    try {
        dispatch({
            type:USER_DETAILS_REQUEST
        })
     
        const {userLogin} = getState()
        const {userInfo} = userLogin
        const config = {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const {data} = await axios.get(`/api/users/${id}`,config)
         dispatch({
            type : USER_DETAILS_SUCCESS,
            payload:data,
        })
       
        
    } catch (error) {

         dispatch({
            type:USER_DETAILS_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        }) 
    }
}

export const getUserNotifications = (userId) => async(dispatch,getState) =>{
    try {
        const {data} = await axios.get(`api/user/getNotificationFromMongoDB?userId=${userId}`)
        dispatch({
            type:GET_USER_NOTIFICATIONS,
            payload:data
        })

    }
    catch(error){
        console.log(error)
    }
}

export const getFreelancerDetails = (id) => async (dispatch, getState) => {

    try{
        dispatch({
            type: FREELANCER_DETAILS_REQUEST
        })

        const {userLogin} = getState()
        const {userInfo} = userLogin
        const config = {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.get(`/api/user/profile?id=${id}`, config)
        dispatch({
            type: FREELANCER_DETAILS_SUCCESS,
            payload: data
        })
    }catch(error){
        dispatch({
            type: FREELANCER_DETAILS_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}

export const getAllFreelancers = () => async (dispatch, getState) => {
    try{
        dispatch({
            type: FREELANCERS_LIST_REQUEST
        })

        const {userLogin} = getState()
        const {userInfo} = userLogin
        const config = {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const {data} = await axios.get(`/api/user/freelancers`,config)
        dispatch({
            type : FREELANCERS_LIST_SUCCESS,
            payload:data,
        })


    }catch(error){
        dispatch({
            type:FREELANCERS_LIST_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}

export const logout = () =>(dispatch)=>{
    localStorage.removeItem('userInfo')
    localStorage.removeItem('calendarSlots')
    dispatch({
        type:USER_LOGOUT
    })
}