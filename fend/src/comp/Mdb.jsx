import axios from 'axios'
import React, { useEffect } from 'react'
import { useContext } from 'react'
import Ct from './Ct' 

const Mdb = () => {
  let [data,setData]=React.useState([])
  let {state}=React.useContext(Ct)
  useEffect(()=>{
    axios.get(`http://localhost:5000/getprodbymerchant/${state.name}`).then((res)=>{
      setData(res.data)
    })
  },[])
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
              <td><button>Edit</button></td>
              <td><button>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>}
      <button>DeleteAllprod</button>
    </div>
  )
}

export default Mdb