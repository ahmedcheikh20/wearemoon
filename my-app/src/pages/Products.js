import React, { useEffect, useState } from "react";
import ProductComponent from "../components/ProductComponent";
import "../styles/products.css";
// import data from "../data"
import axios from "../api/axios";

export default function Products() {
  const [data, setData] = useState([]);
  const handleDelete = async (e)=>{
    e.preventDefault();
    const response = await axios.delete(`products/${e.target.id}`,
     {
         headers: { 'Content-Type': 'application/json' },
         withCredentials: true
     }
     
 );
 setData([])
 
}

  useEffect(() => {
    axios
      .get("products", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((rst) => {
        setData(rst.data);
      })
      .catch((err) => {
        setData([]);
      });
  }, [data]);

  const products = data.map((item,index) => {
    return (
      <ProductComponent
        key={`product number ${index}`}
        id={item.id}
        img={item.image}
        title={item.title}
        price={item.price}
        handleDelete={handleDelete}
      />
    );
  });
  return (
    <div className="d-flex justify-content-start align-items-center mt-5 w-75 flex-wrap mx-auto">
      {products}
    </div>
  );
}