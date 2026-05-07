import React from 'react'
import { useState,useEffect,useContext } from 'react'
import axios from 'axios'
import Ct from './Ct'

const Cart = () => {
  let [data,setData]=useState([])
  let {state} = useContext(Ct)
  useEffect(()=>{
    axios.get(`http://localhost:5000/getcart/${state.userid}`).then((res)=>{  
      setData(res.data)
    })
  } ,[])

  return (
    <div className='cartcon'>
      {data.length === 0 ? (
        <h2>Your cart is empty</h2>
      ) : (
        <h2>Your Cart</h2>
      )}
      {data.map((item) => (
        <div key={item._id} className='cartitem'>
          <img src={`http://localhost:5000/images/${item.image}`} alt={item.name} />
          <div className='cartdet'> <h3>{item.name}</h3>
          <p>Price: {item.price}</p>
          <p><button>-</button> {item.quantity} <button>+</button></p>
          <p>Total: {item.price * item.quantity}</p>
          <button>Remove</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Cart