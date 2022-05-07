import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ProductComponent from '../components/ProductComponent'
import "../styles/products.css"
import data from "../data"
import axios from '../api/axios'

export default function Products() {
  let prod
  useEffect(()=>{
   

     axios.get("products",
     {
       headers: { 'Content-Type': 'application/json' },
       withCredentials: true
      }
      ).then(rst=>{
        prod = rst.data
      }).catch(err=>{
        prod = []
      })
      
      console.log(prod)
    
     
  },[])
  const products = data.map(item => {
    return (
        <ProductComponent
            key={item.id}
            img={item.coverImg}
            rating={item.stats.rating}
            reviewCount={item.stats.reviewCount}
            location={item.location}
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
