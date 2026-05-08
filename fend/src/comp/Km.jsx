import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import Rating from '@mui/material/Rating';
import axios from 'axios'
const Km = () => {
  let [data,setData]=useState({})
  let {id}=useParams()
  useEffect(()=>{
    axios.get(`http://localhost:5000/getproduct/${id}`).then((res)=>{
      setData(res.data)
    })
  },[])

  return (
    <div className='product'>
      <h2>{data.name}</h2>
      <p>{data.price}</p>
      <p>{data.salername}</p>
      <img src={`http://localhost:5000/images/${data.image}`} alt="" />
      <p>{data.description}</p>
      <p>{data.category} </p>
      {data.comments && data.comments.map((c)=><div key={c._id}>
        <h4>{c.name}</h4>
        <p>{c.text}</p>
        <Rating name="read-only" value={c.rating} precision={0.5} readOnly  />

      </div>)}
    </div>
  )
}

export default Km