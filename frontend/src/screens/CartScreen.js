import React, {useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Row,Col,ListGroup,Image,Form,Button,Card,FormControl} from 'react-bootstrap'
import Message from '../components/Message'
import {addToCart,removeFromCart} from '../actions/CartActions'

const CartScreen = ({match,location,history}) => {
   const productId = match.params.id
    const qty = location.search ? Number(location.search.split('=')[1]):1
    /*
    location.search is used to get the URI after ? from the url. 
    split = [1] will get the value of qty which is after qty= in URI.
    In some cases, the redirection to cart might not take place from add to cart click but
    user may want to check his cart by clicking on the cart tab in the navbar.

    In such cases, we don't need location.search but just the numerical 1 just to mention no operation needs to be done
    so the terinary operator is used above to deal with the above requirement.

    */
    const dispatch = useDispatch()
    const cart = useSelector(state =>state.cart)
    const {cartItems} = cart
    useEffect(()=>{
        if(productId){
            dispatch(addToCart(productId,qty))
        
        }
    },[dispatch,productId,qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }
    const proceedTocheckoutHandler = ()=>{
        console.log("Checkout")
    }
    return (
        <Row>
            <Col md={8}>
                <h1> Shopping Cart</h1>
                
                {cartItems.length===0?<Message>cart is Empty <Link to="/">Go Back</Link></Message>
                :<ListGroup varinat='flush'>
                    {
                    cartItems.map((Item) =>(
                      
                        <ListGroup.Item>
                            <Row>
                                <Col md={2}>
                                    <Image src={Item.image} fluid rounded></Image>
                                    
                                </Col>
                                <Col md={3}>
                                    <Link to={`/product/${Item.product}`}>{Item.name}</Link>
                                </Col>
                                <Col md={2}>{Item.price}</Col>
                                <Col md={2}>
                                <FormControl as='select' value={Item.qty} 
                                onChange={
                                    (e)=>{
                                        dispatch(addToCart(Item.product,Number(e.target.value)))
                                    }
                                }
                                >
                                            {
                                                
                                                [...Array(Item.countInStock).keys()].map(
                                                    (x) =>(
                                                        <option key ={x+1} value={x+1}>{x+1}</option>
                                                    )
                                                )
                                            }
                                    </FormControl>
                                </Col>
                                <Col md={2}>
                                    <Button type='button' variant='light' onClick={(e) => {
                                        removeFromCartHandler(Item.product)
                                    }}>
                                        <i className="fas fa-trash"></i>
                                    </Button>
                                </Col>
                            </Row>
                      </ListGroup.Item> 
                    ))
                    }
                </ListGroup>
                }
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            {/*
                            Reduce function on an array is used to iterate over the elements and accumulate it with some calculated value.
                            In this case, we need to calculate total items in the cart. so we iterate over the CartItems array, add the item
                            at every stage to the accumulator acc; it is initialized with 0.
                            */}
                            <h5> Sub Total :{cartItems.reduce((acc,item)=>acc+item.qty,0)} items</h5>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            {/*
                            Same functionality as above. In this case we need to add all items price by multiplying it with the quantity chosen.
                            The resultant would give the final price of the cart.
                            */}
                            <h5> Total Price : $ {cartItems.reduce((acc,item)=>acc+item.price*item.qty,0).toFixed(2)}</h5>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Button type='button' variant='dark'  onClick={proceedTocheckoutHandler}> Proceed To Checkout</Button>
                        </ListGroup.Item>

                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen
