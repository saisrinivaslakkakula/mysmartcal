import {USER_LOGIN_REQUEST,USER_LOGIN_SUCCESS,USER_LOGIN_FAIL,USER_LOGOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_DETAILS_REQUEST, 
    USER_DETAILS_SUCCESS, USER_DETAILS_FAIL,
    GET_USER_NOTIFICATIONS, FREELANCERS_LIST_REQUEST, FREELANCERS_LIST_SUCCESS, FREELANCERS_LIST_FAIL, FREELANCER_DETAILS_REQUEST, FREELANCER_DETAILS_SUCCESS, FREELANCER_DETAILS_FAIL
} from '../constants/userConstants'
const userLoginReducer = (state = {},action) =>{

    switch(action.type){
        case USER_LOGIN_REQUEST:
            return({loading:true})
        case USER_LOGIN_SUCCESS:
            return({loading:false,userInfo:action.payload})
        case USER_LOGIN_FAIL:
            return({loading:false, error:action.payload})
        case USER_LOGOUT:
            return({})
            default:
                return state

    }

}

const userRegisterReducer = (state = {},action) =>{

    switch(action.type){
        case USER_REGISTER_REQUEST:
            return({loading:true})
        case USER_REGISTER_SUCCESS:
            return({loading:false,userInfo:action.payload})
        case USER_REGISTER_FAIL:
            return({loading:false, error:action.payload})
        default:
                return state

    }

}

const userDetailsReducer = (state = {user:{}},action) =>{

    switch(action.type){
        case USER_DETAILS_REQUEST:
            return({...state,loading:true})
        case USER_DETAILS_SUCCESS:
            return({loading:false,user:action.payload})
        case USER_DETAILS_FAIL:
            return({loading:false, error:action.payload})
        default:
                return state

    }

}

const userNotificationsReducer= ()=>(state = {notifications:[]},action) =>{
    switch(action.type){
        case GET_USER_NOTIFICATIONS:
            console.log("Payload Notifications",action.payload)
            return({loading:false,notifications:action.payload})
        default:
            return state
    }

}

const freelancersListReducer = (state = {freelancers: []}, action) => {

    switch(action.type){
        case FREELANCERS_LIST_REQUEST:
            return ({freelancers: [], loading: true})
        case FREELANCERS_LIST_SUCCESS:
            return ({loading: false, freelancers: action.payload})
        case FREELANCERS_LIST_FAIL:
            return ({loading: false, error: action.payload})
        default:
            return state
    }
}
const freelancerDetailsReducer = (state = {freelancer : {}}, action) => {

    switch (action.type){
        case FREELANCER_DETAILS_REQUEST:
            return ({freelancer: {}, loading: true})
        case FREELANCER_DETAILS_SUCCESS:
            return ({loading: false, freelancer: action.payload})
        case FREELANCER_DETAILS_FAIL:
            return ({loading: false, freelancer: action.payload})
        default:
            return state
    }
}

export {userLoginReducer,userRegisterReducer,userDetailsReducer,userNotificationsReducer, freelancersListReducer, freelancerDetailsReducer}