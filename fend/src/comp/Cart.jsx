import React from 'react'
import { useState,useEffect,useContext } from 'react'
import axios from 'axios'
import Ct from './Ct'


const Cart = () => {
  let [data,setData]=useState([])
  let {state,update} = useContext(Ct)
  let [f,setF]=useState(false)
  let [ctotal,setCtotal]=useState(0)
  useEffect(()=>{
    axios.get(`http://localhost:5000/getcart/${state.userid}`).then((res)=>{  
      setData(res.data)
      update({"cartCount": res.data.length })
      setCtotal(res.data.reduce((acc,item)=>{
        return acc+item.price*item.quantity
      },0)) 
    })
  } ,[f])
  let removefromcart=(id)=>{
    axios.delete(`http://localhost:5000/deletecart/${id}`).then((res)=>{
      setF(!f)
    //  setData(data.filter((item)=>item._id!==id))
    })
  }
  let incrementcart=(id)=>{
    axios.put(`http://localhost:5000/incrementcart/${id}`).then((res)=>{
      setF(!f)
    })  
  }
  let decrementcart=(id,quantity)=>{
    if(quantity>1){
      axios.put(`http://localhost:5000/decrementcart/${id}`).then((res)=>{
        setF(!f)
      })
    }
    else{
      removefromcart(id)
    }
  }   

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
          <p><button onClick={()=>decrementcart(item._id,item.quantity)}>-</button> {item.quantity} <button onClick={()=>incrementcart(item._id)}>+</button></p>
          <p>Total: {item.price * item.quantity}</p>
          <button onClick={()=>removefromcart(item._id)}>Remove</button>
          </div>
        </div>
      ))}
     {data.length > 0 && <h2>Total: {ctotal}</h2>}
    </div>
  )
}

export default Cart