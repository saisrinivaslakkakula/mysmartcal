
import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Row,Col} from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
// *--Before Redux=>** import axios from 'axios'
import  {listProducts}  from '../actions/productListActions'

const Homescreen = () => {
   
   const dispatch = useDispatch() // function to choose the list of available dispatch methods created in actions. productListActions in this case

   const productList = useSelector(state=>state.productList)


   const {products,loading,error} = productList

   

    useEffect(()=>{
       // dispatch(listProducts())
    
    },[dispatch]) //[] dependency array if we need options on useEffect


   
    return (
        <>
         <h1> Dashboard</h1> 
         {loading?<Loader>Loading....</Loader>:error?<Message>{error}</Message>:
         <Row>
         This is Dashboard page
        </Row>

         }
            
            
        </>
    )
}

export default Homescreen
