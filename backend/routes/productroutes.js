const express = require('express')
const {getProducts,getProductByID} = require( '../controllers/productController.js')
const router = express.Router()

router.route('/').get(getProducts)
router.route('/:id').get(getProductByID)

module.exports = router;