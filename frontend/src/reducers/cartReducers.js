import {CART_ADD_ITEM, CART_REMOVE_ITEM} from '../constants/cartConstants'
export const cartReducer = (state = {cartItems:[]},action)=>{
    switch (action.type){
        case CART_ADD_ITEM:
            const currentItem = action.payload
            const itemExists = state.cartItems.find(x=>x.product === currentItem.product)
            if(itemExists){
                return{
                    /*if Item exists in cart already, keep cart as it is*/
                    ...state,
                    cartItems: state.cartItems.map(x=>
                        x.product ===itemExists.product ? currentItem : x
                    
                        )
                }

            }
            else{
                return{
                    /* if item is not already there in the cart, add currentItem to the cart */
                    ...state,
                    cartItems: [...state.cartItems,currentItem]
                }
            }
        case CART_REMOVE_ITEM:
            return({
                ...state,
                cartItems: state.cartItems.filter( (x) => x.product!== action.payload)
            }
            )
        default:
            return(state)
    }
}