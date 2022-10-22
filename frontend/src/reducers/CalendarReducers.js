import { CALENDAR_ADD_SLOT, CALENDAR_REMOVE_SLOT, CALENDAR_GET_ALL_SLOTS } from '../constants/calendarConstants'
import moment from "moment";
export const calendarReducer = (state = { calendarSlots: [] }, action) => {
    switch (action.type) {
        case CALENDAR_ADD_SLOT:
            const currentSlots = action.payload.vacantSlots
            return {
                ...state,
                calendarSlots: [...state.calendarSlots, currentSlots]
            }

        case CALENDAR_REMOVE_SLOT:
            return (state)
        case CALENDAR_GET_ALL_SLOTS:
            const allSlots = action.payload.allSlots
            var calendarSlotsArray = []
            for (let i = 0; i < allSlots.length; i++) {
              const event = {
                title: allSlots[i].serviceID,
               start: moment(allSlots[i].date).format("YYYY-MM-DD"),
                end: moment(allSlots[i].date).format("YYYY-MM-DD"),
                fromTime: allSlots[i].fromTime,
                toTime: allSlots[i].toTime,
              }
              calendarSlotsArray.push(event)
            }
            return {
                ...state,
                calendarSlots: calendarSlotsArray
            }
        default:
            return (state)
    }
}