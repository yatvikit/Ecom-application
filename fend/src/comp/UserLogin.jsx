import axios from 'axios'
import {useState,useContext} from 'react'
import Ct from './Ct'
import { useNavigate } from 'react-router-dom'
const UserLogin = () => {
  let [data,setData]=useState({"_id":"","password":""})
  let [msg,setMsg]=useState("")
  let {update}=useContext(Ct) 
   
  let handleChange=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }
  let navigate=useNavigate()
  let login=()=>{
    axios.post("http://localhost:5000/user/login",data).then((res)=>{
      if(res.data.token!=undefined){
        update(res.data)
        navigate('/')
      }
      else{
        setMsg(res.data.message)
      } 
    })
  }


    
  return (
    <div className='formcontainer'>
      <div className='form'>
        <h2 className='msg'>{msg}</h2>
        <input type="email" name="_id" placeholder="Email" value={data._id} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={data.password} onChange={handleChange} />
        <button onClick={login}>Login</button>
      </div>
    </div>
  )
}

export default UserLogin