import React, { useEffect, useState } from 'react'
import ProductComponent from '../components/ProductComponent'
import "../styles/products.css"
// import data from "../data"
import axios from '../api/axios'

export default function Products() {
    const [data, setData] = useState([])
  useEffect(()=>{
   

     axios.get("products",
     {
       headers: { 'Content-Type': 'application/json' },
       withCredentials: true
      }
      ).then(rst=>{
        setData(rst.data)
      }).catch(err=>{
       setData([])
      })
    
     
  },[])
 
 
  const products = data.map(item => {
    return (
        <ProductComponent
            key={item.id}
            img={item.coverImg}
            title={item.title}
            price={item.price}
            openSpots={item.openSpots}
        />
    )
})
  return (
    <div className="products">
      {products}
    </div>
  )
}
