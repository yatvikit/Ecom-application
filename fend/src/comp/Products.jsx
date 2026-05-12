import React from 'react'
import { useState,useEffect,useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Ct from './Ct'
import { useNavigate } from 'react-router-dom'


const Products = () => {
  let [data,setData]=useState([])
   let [msg,setMsg]=useState("") 
  let {state}=useContext(Ct)
  let navigation=useNavigate()
  let [f,setF]=useState(false)
    let [f1,setF1]=useState(false)
  useEffect(()=>{
    axios.get("http://localhost:5000/getproducts").then((res)=>{
      setData(res.data)
    })  
  },[f1])
  let addcart=(item)=>{
    if(state.token!=""){
      axios.post("http://localhost:5000/addcart",{"productid":item._id,"name":item.name,"price":item.price,"image":item.image,"salername":item.salername,"userid":state.userid}).then((res)=>{
        setMsg(res.data)
        setF(true)
        setTimeout(() => {
          setF(false)
        }, 5000);
        navigation("/cart")
      })
    } 
    else{
      navigation("/userlogin")  

    }
  }
    let del=(id)=>{
    axios.delete(`http://localhost:5000/deleteproduct/${id}`).then((res)=>{
    setF1(!f1)
    })
  }
 
        return (
    <div className='prodcon'>
       {f&& <h2 className='alert'>{msg}</h2>}
      {data.map((item)=><div className='prod' key={item._id}>
        <img src={`http://localhost:5000/images/${item.image}`} alt="" />
        <div className='proddet'>
           <h3>{item.name}</h3>
          <p>{item.price}</p>
          <p>{item.salername}</p>
          <button><Link to={`/knowmore/${item._id}`}>View Details</Link> </button>
          <button onClick={() => addcart(item)}>Add to Cart</button>
         {state.role==='admin' && (
            <button><Link to={`/edit/${item._id}`}>Edit</Link> </button>
          )}
         {state.role==='admin' && (
            <button onClick={() => del(item._id)}>Delete</button>
          )}

        </div>
       
      </div>)}  
    </div>
  )
}

export default Products