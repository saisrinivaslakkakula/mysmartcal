import {
    CALENDAR_REMOVE_SLOT,
    CALENDAR_GET_ALL_SLOTS,
    CALENDAR_ADD_SLOT_REQUEST,
    CALENDAR_ADD_SLOT_SUCCESS,
    CALENDAR_ADD_SLOT_FAIL,
    CALENDAR_EDIT_VACANT_SLOT_REQUEST,
    CALENDAR_EDIT_VACANT_SLOT_SUCCESS,
    CALENDAR_EDIT_VACANT_SLOT_FAIL,
    FREELANCER_APPROVE_SLOT,
    FREELANCER_REJECT_SLOT,
    FREELANCER_SLOTS_REQUEST,
    FREELANCER_SLOTS_SUCCESS,
    FREELANCER_SLOTS_FAIL, FREELANCER_REQUEST_SLOT
} from '../constants/calendarConstants'
import axios from 'axios'


export const getAllSlots = (userId) => async (dispatch, getState) => {
    console.log("userId", userId);
    const { data } = await axios.get(`/api/calendar/getCalendarSlots?userId=${userId}`)
    console.log("data",data);
    dispatch({
        type: CALENDAR_GET_ALL_SLOTS,
        payload: {
            allSlots: data
        }
    })
    // store the calendar slots in local storage
    localStorage.setItem('calendarSlots', JSON.stringify(getState().calendarSlots.calendarSlots))
}

export const getFreelancerVacantSlots = (userId) => async (dispatch, getState) => {
    try{
        dispatch({
            type: FREELANCER_SLOTS_REQUEST
        })

        const {userLogin} = getState()
        const {userInfo} = userLogin
        const config = {
            headers: {
                'Content-Type':'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }
        const {data} = await axios.get(`/api/calendar/getCalendarSlots?userId=${userId}`,config)
        dispatch({
            type : FREELANCER_SLOTS_SUCCESS,
            payload: data,
        })
    }
    catch(error){
        dispatch({
            type: FREELANCER_SLOTS_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message: error.message
        })
    }
}

export const addVacantSlot = (userid, calendarSlot) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CALENDAR_ADD_SLOT_REQUEST,
            payload: calendarSlot
        })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        console.log("calendarSlot", calendarSlot);
        const reqestbody = {
            userId: userid,
            calendarSlot: calendarSlot
        }
        console.log("reqestbody", reqestbody);
        const { data } = await axios.post(`/api/calendar/addVacantSlot`, reqestbody,config)
        const { vacantSlots } = data
        console.log("vacantSlots", vacantSlots);
        dispatch({
            type: CALENDAR_ADD_SLOT_SUCCESS,
            payload: {
                userId: userid,
                calendarSlots:vacantSlots
            }
        })
        dispatch({
            type: CALENDAR_GET_ALL_SLOTS,
            payload: {
                allSlots: vacantSlots
            }
        })
        localStorage.setItem('calendarSlots', JSON.stringify(getState().calendarSlots.calendarSlots))
    } catch (error) {
        dispatch({
            type: CALENDAR_ADD_SLOT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
        getAllSlots(userid)
        
    }
    //console.log("Local", getState())
    

}




export const removeVacantSlot = (userId, slotId,status) => async (dispatch, getState) => {
    //console.log("slotId",slotId);
    const { data } = await axios.delete(`api/calendar/freelancerRemoveVacantSlot?userId=${userId}&slotId=${slotId}&status=${status}`)
    //console.log("data",data);
    dispatch({
        type: CALENDAR_REMOVE_SLOT,
        payload: slotId
    })
    getAllSlots(userId)(dispatch, getState)
}

export const FreelancerremoveConfirmedSlot = (userId, slotId,status) => async (dispatch, getState) => {
    //console.log("slotId",slotId);
    const { data } = await axios.delete(`api/calendar/freelancerRemoveConfirmedSlot?userId=${userId}&slotId=${slotId}&status=${status}`)
    //console.log("data",data);
    dispatch({
        type: CALENDAR_REMOVE_SLOT,
        payload: slotId
    })
    getAllSlots(userId)(dispatch, getState)
}

export const UserremoveConfirmedSlot = (userId, slotId,status) => async (dispatch, getState) => {
    //console.log("slotId",slotId);
    const { data } = await axios.delete(`api/calendar/userRemoveConfirmedSlot?userId=${userId}&slotId=${slotId}&status=${status}`)
    //console.log("data",data);
    dispatch({
        type: CALENDAR_REMOVE_SLOT,
        payload: slotId
    })
    getAllSlots(userId)(dispatch, getState)
}

export const editVacantSlot = (userId,slotId,startTime,endTime) => async (dispatch, getState) => {

try{
    dispatch({
        type: CALENDAR_EDIT_VACANT_SLOT_REQUEST,
    })
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const getAPIString = `api/calendar/freelancerEditVacantSlot?userId=${userId}&slotId=${slotId}&fromTime=${startTime}&toTime=${endTime}`
    const { data } = await axios.get(getAPIString,config)
    console.log("data", data);
    const { vacantSlots } = data
    console.log("vacantSlots", vacantSlots);
    dispatch({
        type: CALENDAR_EDIT_VACANT_SLOT_SUCCESS,
        payload: {
            userId: userId,
            calendarSlots:vacantSlots
        }
    })
}
catch (error) {
    //console.log("error",error);
    dispatch({
        type: CALENDAR_EDIT_VACANT_SLOT_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
    getAllSlots(userId)(dispatch, getState)
}
//console.log("Local", getState())
localStorage.setItem('calendarSlots', JSON.stringify(getState().calendarSlots.calendarSlots))
}

export const freeLancerApproveSlot = (slotId,userId,freelancerId) => async (dispatch, getState) => {
    const { data } = await axios.get(`api/calendar/freeLancerApproveAppointment?userId= ${userId}&slotId=${slotId}&freelancerId=${freelancerId}`)
    console.log("data",data);
    dispatch({
        type: FREELANCER_APPROVE_SLOT,
        payload: data
    })
    getAllSlots(userId)(dispatch, getState)
}

export const userRequestAppointment = (calendarSlot ,userId,freelancerId) => async (dispatch, getState) => {
    const {userLogin} = getState()
    const {userInfo} = userLogin

    const config = {
        headers: {
            'Content-Type':'application/json',
            Authorization: `Bearer ${userInfo.token}`,
        }
    }

    const { data } = await axios.post(`/api/calendar/userRequestAppointmentKafka`, { calendarSlot, userId, freelancerId }, config)

    dispatch({
        type: FREELANCER_REQUEST_SLOT,
        payload: data
    })

    getFreelancerVacantSlots(freelancerId)(dispatch, getState)
}



export const freeLancerRejectSlot = (slotId,userId,freelancerId) => async (dispatch, getState) => {
    const { data } = await axios.get(`api/calendar/freeLancerRejectAppointment?userId= ${userId}&slotId=${slotId}&freelancerId=${freelancerId}`)
    //console.log("data",data);
    dispatch({
        type: FREELANCER_REJECT_SLOT,
        payload: data
    })
    getAllSlots(userId)(dispatch, getState)
}