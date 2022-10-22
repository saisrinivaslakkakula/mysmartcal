//import jwt from 'jsonwebtoken'
const jwt = require('jsonwebtoken')
//import userModel from '../data/models/userModel.js'
const userModel = require('../data/models/userModel.js')
//import asyncHandler from 'express-async-handler'
const asyncHandler = require('express-async-handler')


const protect = asyncHandler(async(req,res,next) =>{
   /* console.log(req.headers.authorization) // we will send this from the application/ post man in case of testing in the request body
    next() // we use next for every middlware we use */

    /* IMPORTANT:
    When the token is sent from the client side, The token is verified at the server side and the authorization is verified. 
    This is done as the backend has JWT secret used to decode the token sent and get the user ID and password from it.

    (Token). => Protected route --> Backend --> take the token --> Decode it with the JWT secret --> get the username and password --> return authorization code.
*/
    if(req.headers.authorization && (req.headers.authorization.startsWith('Bearer'))){
        
        try {
            const token = req.headers.authorization.split(' ')[1] // this gives only token from the request body seperating the Bearer keyword
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            req.user = await userModel.findById(decoded.id).select('-password') // removing password from the query response

            next() // next() is mandatory for async functions in the middleware

        } catch (error) {
            res.status('401')
            throw new Error ("Bad Token. Authorization Failed")
            
        }
    }
    else{
        res.status('401')
        throw new Error ("Not Authorized!")
    }

})

export  {protect}