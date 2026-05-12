import React, { useEffect } from 'react'
import { useContext } from 'react'
import Ct from './Ct' 
import { useParams,useNavigate } from 'react-router-dom'
import axios from 'axios'

const Edit = () => {
  let [data,setData]=React.useState({})
  let [image,setImage]=React.useState(null)
  let {state}=React.useContext(Ct)
  let {id}=useParams()
  let navigate=useNavigate()
  useEffect(()=>{
    if(state.token===""){
      navigate("/adminlogin")
    }
    else
    {
    axios.get(`http://localhost:5000/getproduct/${id}`).then((res)=>{
      setData(res.data)
    })
  }
  },[])
  let handleChange=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }
  let update=()=>{
    axios.put("http://localhost:5000/updateproductdetails",data).then((res)=>{
      alert(res.data.message)
    })
  }
  let updimg=()=>{
    let formdata=new FormData()
    formdata.append("_id",id)
    formdata.append("image",image)
    axios.put("http://localhost:5000/updateproductimage",formdata).then((res)=>{
      alert(res.data.message)
    })
  } 
  return (
    <div  classname="formcontainer" >
      <h2>Edit Product Detailes</h2>
      <div className='form'>
        <input type="text" name="name" placeholder="Product Name" value={data.name} onChange={handleChange} />
        <input type="number" name="price" placeholder="Price" value={data.price} onChange={handleChange} />
        <input type="text" name="category" placeholder="Category" value={data.category} onChange={handleChange} />
        <textarea name="description" placeholder="Description" value={data.description} onChange={handleChange}></textarea>
        <button onClick={update}>Update Product</button>
      </div>
      <div className='form'>
        <h2>Update Product Image</h2>
        <input type="file" name="image" onChange={(e)=>{
          setImage(e.target.files[0])
        }} /> 
        <button onClick={updimg}>Update Image</button>
      </div>
    </div>
  )
}


export default Edit