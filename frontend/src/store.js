import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import  {composeWithDevTools} from 'redux-devtools-extension'
import {userLoginReducer,userRegisterReducer,userDetailsReducer,userNotificationsReducer, freelancersListReducer, freelancerDetailsReducer} from './reducers/userReducers'
import {calendarReducer, freelancerSlotsReducer } from './reducers/CalendarReducers'
const userInfoFromStorage = localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null
const calendarSlotsFromStorage = localStorage.getItem('calendarSlots')?JSON.parse(localStorage.getItem('calendarSlots')):[]
const reducer = combineReducers({
    userLogin : userLoginReducer,
    userRegister : userRegisterReducer,
    userDetails:userDetailsReducer,
    calendarSlots:calendarReducer,
    notifications:userNotificationsReducer,
    freelancersList: freelancersListReducer,
    freelancerDetails: freelancerDetailsReducer,
    freelancerSlots: freelancerSlotsReducer

})
const initialState = {
    userLogin: {
        userInfo:userInfoFromStorage,
    },
    calendarSlots:{
        calendarSlots:calendarSlotsFromStorage
    },
    notifications:{
        notifications:[]
    }
}
const middleWare = [thunk]
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleWare))

)

export default store