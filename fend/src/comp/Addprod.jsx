import  { useContext } from 'react'
import Ct from './Ct'
import { useState } from 'react'
import axios from 'axios'


const Addprod = () => {
  let [data,setData]=useState({"name":"","price":"","category":"","image":"","description":" "})
  let [msg,setMsg]=useState("")
  let handleChange=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  } 
  let fun1=(e)=>{
    setData({...data,"image":e.target.files[0]})
  }
   let {state}=useContext(Ct)
  let add=()=>{
    let fd=new FormData()
    for(let key in data){
      fd.append(key,data[key])
    }
   
    fd.append("salername",state.name) 
    axios.post("http://localhost:5000/addproduct",fd).then((res)=>{
      setMsg(res.data.message)
    })
  }
  return (
    <div className='formcontainer'>
      <div className='form'>
        <h2>Add Product</h2>
        <h2 className='msg'>{msg}</h2>
        <input type="text" name="name" placeholder="Product Name" value={data.name} onChange={handleChange} />
        <input type="number" name="price" placeholder="Price" value={data.price} onChange={handleChange} />
        <input type="text" name="category" placeholder="Category" value={data.category} onChange={handleChange} />
        <input type="file" name="image" onChange={fun1} />
        <textarea name="description" placeholder="Description" value={data.description} onChange={handleChange}></textarea>
        <button onClick={add}>Add Product</button>
        
      </div>
    </div>
  )
}

export default Addprod