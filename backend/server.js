const express = require('express')
const path = require('path') 
const env = require('dotenv')
const connectDB = require( './config/db.js')
const router = require('./routes/productroutes.js')
/*import userRoutes from './routes/userRoutes.js'
import {notFound,errorHandler} from './middleware/errorMiddleware.js'*/
env.config()
connectDB();
const app = express()
app.use(express.json()) //This is to tell express that the incoming request data will contain Json and a=parse the same. 
const PORT = process.env.PORT || 5001

//const __dirname = path.resolve()
if(process.env.NODE_ENV === 'production'){
    
    app.use(express.static(path.resolve(__dirname,'frontend/build')))
    app.get('*',(req,res) => res.sendFile(path.resolve(__dirname,'../frontend/build','index.html')))

    
}

app.listen(PORT)
//app.use('/api/products',router)
//app.use('/api/users',userRoutes)
app.get('/',(req,res)=>{
    res.send("API Stareted....")
})
//app.use(notFound) 
//app.use(errorHandler) 



