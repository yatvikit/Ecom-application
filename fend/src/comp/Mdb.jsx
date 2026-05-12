import axios from 'axios'
import React, { useEffect } from 'react'
import { useContext } from 'react'
import Ct from './Ct' 
import { Link,useNavigate } from 'react-router-dom'

const Mdb = () => {
  let [data,setData]=React.useState([])
  let {state}=React.useContext(Ct)
  let navigate=useNavigate()
  let[f,setF]=React.useState(false)
  useEffect(()=>{
    if(state.token===""){
      navigate("/adminlogin")
    }
    else
    {
    axios.get(`http://localhost:5000/getprodbymerchant/${state.name}`).then((res)=>{
      setData(res.data)
    })
  }
  },[f])
  let del=(id)=>{
    axios.delete(`http://localhost:5000/deleteproduct/${id}`).then((res)=>{
    setF(!f)
    })
  }
  return (
    <div>
      <h2>Merchant Dashboard</h2>
      {data.length===0&&<p>No products found</p>}
     {data.length>0&& <table border={1}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
           <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {data.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td><button><Link to={`/edit/${product._id}`}>Edit</Link></button></td>
              <td><button onClick={()=>del(product._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>}
    
    </div>
  )
}

export default Mdb