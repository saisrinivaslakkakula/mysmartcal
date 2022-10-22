import {CALENDAR_ADD_SLOT,CALENDAR_REMOVE_SLOT,CALENDAR_GET_ALL_SLOTS} from '../constants/calendarConstants'
import axios from 'axios'
export const addVacantSlot = (userid,calendarSlot) => async (dispatch,getState) =>{
    console.log("calendarSlot",calendarSlot);
    const reqestbody = {
        userId:userid,
        calendarSlot:calendarSlot
    }
    const {data} = await axios.post(`/api/calendar/addVacantSlot`,reqestbody)
    const {vacantSlots} = data
    dispatch({
        type:CALENDAR_ADD_SLOT,
        
        payload:{
            userId:userid,
            vacantSlots

        }
    })
    //localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}

/*export const removeFromCart = (id) => async (dispatch,getState) =>{
    dispatch({
        type:CART_REMOVE_ITEM,
        payload:id
    })
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}*/
/* local storage is used to store the data locally. in this case,
we're storing the cart items. Since local storage accepts only strings, we're stringyfying the JSON object*/

export const getAllSlots = (userId) => async (dispatch,getState) =>{
    console.log("userId",userId);
    const {data} = await axios.get(`/api/calendar/getCalendarSlots?userId=${userId}`)
    //console.log("data",data);
    dispatch({
        type:CALENDAR_GET_ALL_SLOTS,
        payload:{
            allSlots:data
        }
    })
}