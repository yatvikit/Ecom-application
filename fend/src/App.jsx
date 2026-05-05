import { BrowserRouter, Route,Routes } from "react-router-dom";
import Nav from "./comp/Nav";
import Ct from "./comp/Ct";
import Products from "./comp/Products";
import Km from "./comp/Km";
import BR from "./comp/BR";
import Admindb from "./comp/Admindb";
import Mdb from "./comp/Mdb";
import Resetpwd from "./comp/Resetpwd";
import UserLogin from "./comp/UserLogin";
import UserReg from "./comp/UserReg";
import Cart from "./comp/Cart";
import AdminLogin from "./comp/AdminLogin";
import Logout from "./comp/Logout";
import Edit from "./comp/Edit";
import { useState } from "react";
import "./App.css"
import Addprod from "./comp/Addprod";

const App = () => {
let [state,setState]=useState({"token":"","role":"","_id":"","name":""})
let update=(data)=>{
  setState({ ...state, ...data })
}

  return (
    <BrowserRouter>
    <Ct.Provider value={{state,update}}>
    <Nav/> 
    <Routes>
      <Route path="/edit/:id" element={<Edit/>}/>
      <Route path="/logout" element={<Logout/>}/>
      <Route path="/" element={<Products/>}/>
      <Route path="/userlogin" element={<UserLogin/>}/>
      <Route path="/userregister" element={<UserReg/>}/>
      <Route path="/addproduct" element={<Addprod/>}/>
      <Route path="/knowmore/:id" element={<Km/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/br" element={<BR/>}/>
      <Route path="/adminlogin" element={<AdminLogin/>}/> 
      <Route path="/admindashboard" element={<Admindb/>}/>
      <Route path="/merchentdashboard" element={<Mdb/>}/>
      <Route path="/resetpassword" element={<Resetpwd/>}/> 


      
      </Routes> 
    
    </Ct.Provider>
    </BrowserRouter>
  )
}

export default App