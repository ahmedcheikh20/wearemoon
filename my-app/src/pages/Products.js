import React from 'react'
import { useNavigate } from 'react-router-dom'
import "../styles/products.css"

export default function Products() {
  let navigate = useNavigate()
  return (
    <div className="products">Products
        <button onClick={()=>{
           navigate("addProduct") 
        }} >to addProduct</button>
    </div>
  )
}
