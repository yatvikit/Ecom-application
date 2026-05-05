import { Link } from "react-router-dom"
import "./Nav.css"
import { useContext } from "react"
import Ct from "./Ct"
const Nav = () => {
    let { state,update}=useContext(Ct)
  return (
    <div className="nav">
        <Link to="/">Home</Link>
      {state.token==""?<>  <Link to="/userlogin">UserLogin</Link>
        <Link to="/userregister">UserRegister</Link>
        <Link to="/br">BS Reg</Link>
         <Link to="/adminlogin">AdminLogin</Link></>:<>
         <Link to="/cart">Cart</Link>
       {(state.role==="admin" ||state.role==="merchant" )&& <Link to="/addproduct">AddProduct</Link>}
       {state.role==="merchant" && <Link to="/merchentdashboard">MerchentDashboard</Link>}
       {state.role==="admin" && <Link to="/admindashboard">AdminDashboard</Link>}    
        <Link to="/logout">Logout</Link></>}
    </div>
  )
}

export default Nav