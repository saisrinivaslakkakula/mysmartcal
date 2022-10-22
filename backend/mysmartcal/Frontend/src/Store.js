import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { configureStore } from '@reduxjs/toolkit'
import thunk from "redux-thunk";
import calenderReducer from "./reducers/calenderReducer";
const intitalState = {};

const middleware = [thunk];

const store = configureStore({
    reducer: {
        calendar: calenderReducer
    }
//   intitalState,
//   composeWithDevTools(applyMiddleware(...middleware))
});

export default store;