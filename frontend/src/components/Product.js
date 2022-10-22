import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating.js'
import {Link} from 'react-router-dom'
import Image from 'react-bootstrap/Image'
const Product = ({product}) => {
    return (
       
           <Card className="p-2 my-3 rounded " >
                <Link to={`/product/${product._id}`}>
                    <Card.Img   className="card-img-top" src={product.image} /> 
                </Link>
                <Card.Body>
                    <Link to={`/product/${product._id}`}>
                        <Card.Title as='div'><strong>{product.name}</strong></Card.Title>
                    </Link>
                    <Card.Text as='div' className="my-3">
                        <Rating rating={product.rating} numreviews={product.numReviews}/>
                    </Card.Text>
                    <Card.Text as='h3'>
                        ${product.price}
                    </Card.Text>
                </Card.Body>
            </Card> 
           

            
        
    )
}

export default Product
