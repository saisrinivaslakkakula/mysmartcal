import { CALENDAR_ADD_SLOT, CALENDAR_REMOVE_SLOT, CALENDAR_GET_ALL_SLOTS, CALENDAR_ADD_SLOT_SUCCESS, CALENDAR_ADD_SLOT_REQUEST, CALENDAR_ADD_SLOT_FAIL, CALENDAR_EDIT_VACANT_SLOT_REQUEST,CALENDAR_EDIT_VACANT_SLOT_SUCCESS,CALENDAR_EDIT_VACANT_SLOT_FAIL, FREELANCER_APPROVE_SLOT, FREELANCER_REJECT_SLOT } from '../constants/calendarConstants'
import moment from "moment";
/*export const calendarReducer = (state = { calendarSlots: [] }, action) => {
    switch (action.type) {
        case CALENDAR_ADD_SLOT:
            const currentSlots = action.payload.vacantSlots
            return {
                ...state,
                calendarSlots: [...state.calendarSlots, currentSlots]
            }

        case CALENDAR_REMOVE_SLOT:
            return {
                ...state,
                calendarSlots: state.calendarSlots.filter((x) => x._id !== action.payload)
            }
        case CALENDAR_GET_ALL_SLOTS:
            const allSlots = action.payload.allSlots
            var calendarSlotsArray = []
            for (let i = 0; i < allSlots.length; i++) {
            //console.log("allSlots[i]", allSlots[i]);
              const event = {
                slotId: allSlots[i].slotId,
                title: allSlots[i].serviceID,
               start: moment(allSlots[i].date).format("YYYY-MM-DD"),
                end: moment(allSlots[i].date).format("YYYY-MM-DD"),
                fromTime: allSlots[i].fromTime,
                toTime: allSlots[i].toTime,
              }
              calendarSlotsArray.push(event)
            }
            //console.log("calendarSlotsArray", calendarSlotsArray);
            return {
                ...state,
                calendarSlots: calendarSlotsArray
            }
        default:
            return (state)
    }
}*/

export const calendarReducer = (state = { calendarSlots: [] }, action) => {
    switch (action.type) {
        case CALENDAR_ADD_SLOT_REQUEST:
            return { loading: true }
        case CALENDAR_ADD_SLOT_SUCCESS:
            //console.log("action.payload", action.payload);
            return { loading: false, calendarSlots: action.payload.calendarSlots }
        case CALENDAR_ADD_SLOT_FAIL:
            return { loading: false, error: action.payload }
        case CALENDAR_GET_ALL_SLOTS:
            const allSlots = action.payload.allSlots
            var calendarSlotsArray = []
           // console.log("allSlots", allSlots);
            for (let i = 0; i < allSlots.length; i++) {
                //console.log("allSlots[i]", allSlots[i]);
                const event = {
                    slotId: allSlots[i].slotId,
                    title: allSlots[i].serviceID,
                    start: moment(allSlots[i].date).format("YYYY-MM-DD"),
                    end: moment(allSlots[i].date).format("YYYY-MM-DD"),
                    fromTime: allSlots[i].fromTime,
                    toTime: allSlots[i].toTime,
                    status: allSlots[i].status

                }
                calendarSlotsArray.push(event)
            }
            console.log("calendarSlotsArray", calendarSlotsArray);
            return {
                ...state,
                calendarSlots: calendarSlotsArray
            }
        case CALENDAR_EDIT_VACANT_SLOT_REQUEST:
            return { loading: true }
        case CALENDAR_EDIT_VACANT_SLOT_SUCCESS:
            return { loading: false, calendarSlots: action.payload.calendarSlots }
        case CALENDAR_EDIT_VACANT_SLOT_FAIL:
            return { loading: false, error: action.payload }
        case FREELANCER_APPROVE_SLOT:
            return { loading: false, calendarSlots: action.payload.calendarSlots }
        case FREELANCER_REJECT_SLOT:
            return { loading: false, calendarSlots: action.payload.calendarSlots }
        default:
            return state
    }
}

