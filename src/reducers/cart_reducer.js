import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {

  if (action.type === ADD_TO_CART) {
    const { product, amount, quantityOnHand } = action.payload;
   
    const tempItem = state.cart.find((item) => item.id === product.id);
    if(tempItem){
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === product.id) {
          let newAmount = cartItem.amount + amount;
          if (newAmount > quantityOnHand) {
            newAmount= quantityOnHand
          }
          return {...cartItem, amount: newAmount}
          
        } else {
          return cartItem
        }
      })
      return {...state, cart:tempCart}
    } else {
      const newItem = {
        id: product.id,
        name: product.name,
        amount,
        image: product.images[0].url,
        price: product.price,
        max:quantityOnHand
       
      }
      return {...state, cart:[...state.cart, newItem]}
    }
  }

  if (action.type === CLEAR_CART) {
    return {...state, cart: []}
  }

  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter((item) => item.id !== action.payload)
    return { ...state, cart: tempCart }
  }

  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload;
 
    const tempCart = state.cart.map((item) => {

      if (item.id === id) {
        let newAmount = item.amount;
      
        if (value === 'increase') {
             newAmount = item.amount + 1
           if (newAmount > item.max) {
             newAmount = item.max;
          }
         
          return {...item, amount: newAmount }
        }
        if (value === 'decrease') {
           let newAmount = item.amount - 1
          if (newAmount < 1) {
            newAmount = 1;
          }
          return {...item, amount: newAmount }
        }
      }
        return item;
      
    })
    return { ...state, cart:tempCart}
  }

  if (action.type === COUNT_CART_TOTALS) {
    const { total_items, total_amount } =
      state.cart.reduce((total, cartItem) => {
        const { amount, price } = cartItem
        total.total_items += amount;
        total.total_amount += price * amount;
      
      return total
    }, {
      total_items:0, total_amount:0
      })
      return {...state, total_items, total_amount}
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
