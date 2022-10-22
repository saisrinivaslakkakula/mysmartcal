//import  mongoose from 'mongoose'
const mongoose = require('mongoose')
//import users from './data/users.js'
const users = require('./data/users.js')
//import products from './data/products.js'
const products = require('./data/products.js')
//import User from './data/models/userModel.js'
const User = require('./data/models/userModel.js')
//import Order from './data/models/orderModel.js'
const Order = require('./data/models/orderModel.js')
//import Product from './data/models/productModel.js'
const Product = require('./data/models/productModel.js')
//import env from 'dotenv'
const env = require('dotenv')
//import connectDB from './config/db.js'
const connectDB = require( './config/db.js')
env.config()

connectDB()

const importData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users)
        const adminUser = createdUsers[0]._id
        const modifiedProducts = products.map(product =>{return{...product,user:adminUser}})
        const createdProducts = await Product.insertMany(modifiedProducts)
        console.log('Data Importedsuccessfully!')
        process.exit()
        
    } catch (error) {
        console.error(`Error:${error}`)
        process.exit()      
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        
        console.log('Data destroyed successfully!')
        process.exit()
        
    } catch (error) {
        console.error(`Error:${error}`)
        process.exit()      
    }
}

if(process.argv[2]==='-d'){
  
  destroyData()
}
else
importData()

