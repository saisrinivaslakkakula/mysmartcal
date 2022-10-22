const Product = require('../data/models/productModel.js')
const asyncHandler =  require('express-async-handler')

const getProducts = asyncHandler(async (req,res)=>{
    const products = await Product.find()
    res.json(products)
})

const getProductByID = asyncHandler(async (req,res)=>{
    const product = await  Product.findById(req.params.id)
    if(product)
    res.json(product)
    else{
        res.status(404)
        throw new Error(' Product not Found')
    }
    
})
module.exports =  {getProducts,getProductByID} 