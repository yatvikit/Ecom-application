import React, { useContext, useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import axios from 'axios'
import Ct from "./Ct";
const Km = () => {
  let [data,setData]=useState({})
    const [value, setValue] = React.useState(5);
    const [text,setText]=useState("")
    let {state}=useContext(Ct)
  let {id}=useParams()
  let [f,setF]=useState(false)
  let [avgrating,setAvgrating]=useState(0)
  useEffect(()=>{
    axios.get(`http://localhost:5000/getproduct/${id}`).then((res)=>{
      setData(res.data)
      if (res.data.comments && res.data.comments.length > 0) {
        const totalRating = res.data.comments.reduce((sum, comment) => sum + comment.rating, 0);
        setAvgrating(totalRating / res.data.comments.length);
      }
    })
  },[f])
  let addcomment=()=>{
    axios.post(`http://localhost:5000/addcomment`,{"pid":id,"text":text,"rating":value,"name":state.name}).then((res)=>{
      setF(!f)
    })
  }

  return (
    <div className='product'>
      <h2>{data.name}</h2>
      <p>{data.price}</p>
      <p>{data.salername}</p>
      <img src={`http://localhost:5000/images/${data.image}`} alt="" />
      <p>{data.description}</p>
      <p>{data.category} </p>
      {data.comments&&data.comments.length>0&&<><Rating name="read-only" value={avgrating} precision={0.5} readOnly  />
      <span>({avgrating.toFixed(1)}/{data.comments?.length})</span>
      </> }
      {data.comments && data.comments.map((c)=><div key={c._id}>
        <h4>{c.name}</h4>
        <p>{c.text}</p>
        <Rating name="read-only" value={c.rating} precision={0.5} readOnly  />

      </div>)}
      {
        state.token!==""&&<div>
          <h3>Add Comment</h3>
         
          <textarea placeholder='Comment' value={text} onChange={(e)=>setText(e.target.value)}></textarea>

          <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
       
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
       
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        
      />
      <button onClick={addcomment}>Add Comment</button>
</div>
      }
    </div>
  )
}

export default Km