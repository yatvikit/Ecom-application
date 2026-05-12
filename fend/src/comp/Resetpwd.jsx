import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
  

const Resetpwd = () => {
  let [email,setEmail]=React.useState("")
  let [otp,setOtp]=React.useState("")
  let [newpwd,setNewpwd]=React.useState("")
  let [msg,setMsg]=React.useState("")
  let [f,setF]=React.useState(false)
  let navigate=useNavigate()
  let sendotp=()=>{
    axios.post("http://localhost:5000/user/genotp",{"_id":email}).then((res)=>{
      setMsg(res.data.message)
      setF(true)

    }).catch((err)=>{
      console.log(err)
      setMsg("Error sending OTP")
    })
  }
  let resetpwd=()=>{
    axios.post("http://localhost:5000/user/resetpwd",{"_id":email,"otp":otp,"newpwd":newpwd}).then((res)=>{
      alert(res.data.message)
      navigate("/userlogin")
    }).catch((err)=>{
      setMsg("Error resetting password")
    }
    )
  }

  return (
    <div className='formcontainer'>
     <h2 className='msg'>{msg}</h2>
          <div className='form'>
        
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} readOnly={f} />
       {!f&& <button onClick={sendotp}>Send OTP</button>}
       {f&&<>
       <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
       <input type="password" placeholder="New Password" value={newpwd} onChange={(e) => setNewpwd(e.target.value)} />
       <button onClick={resetpwd}>Reset Password</button>
       </>}
       
      </div>
    </div>
  )
}

export default Resetpwd