import React, { useState } from 'react'
import { FiTrash } from "react-icons/fi";

function CartItem(props) {
  // console.dir(props.item)
  return (
    <div className='cartItem'>
      <img src={props.item.product.image}></img>
      <h3>{props.item.product.name}</h3>
      <b>{props.item.product.price} $ </b>
      <FiTrash className='deletecartItem' 
        onClick={() => props.onDeleteFromCart(props.item.id)}/><br/>
        <b className='cart-quantity'>Кол-во: {props.item.quantity}</b><br/>
        <h7 className='cart-quantity'>{props.item.size.name}</h7>
    </div>
  )
}

export default CartItem