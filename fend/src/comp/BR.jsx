import {useState} from 'react'
import axios from 'axios'

const BR = () => {
  let [data,setData]=useState({"name":"","_id":"","password":"","mobile":""})
  let [msg,setMsg]=useState("")
  let handleChange=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }
  let register=()=>{
    axios.post("http://localhost:5000/admin/reg",data).then((res)=>{
      setMsg(res.data.message)
      if(res.data.message==="Bussiness added successfully"){
        setData({"name":"","_id":"","password":"","mobile":""})
      }
    }).catch((err)=>{
      setMsg("Error registering business")
    })
  }
  return (
    <div className='formcontainer'>
    <div className='form'>
      <h2 className='msg'>{msg}</h2>
      <input type="text" name="name" placeholder="Name" value={data.name} onChange={handleChange} />
      <input type="email" name="_id" placeholder="Email" value={data._id} onChange={handleChange} />
      <input type="password" name="password" placeholder="Password" value={data.password} onChange={handleChange} />
      <input type="tel" name="mobile" placeholder="Mobile" value={data.mobile} onChange={handleChange} />
      <button onClick={register}>Register</button>
    </div>
    </div>
  )
}

export default BR