import {useContext,useEffect} from 'react'
import Ct from './Ct'
import { useNavigate } from 'react-router-dom'
const Logout = () => {
  let {update}=useContext(Ct)
  let navigate=useNavigate()
  useEffect(()=>{
    update({"token":"","role":"","_id":"","name":""})
    navigate('/')
    
    
  },[])
  return (
    <div>Logout</div>
  )
}

export default Logout