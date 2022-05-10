import React, { useEffect, useState, useCallback } from "react";
import ProductComponent from "../components/ProductComponent";
import "../styles/products.css";
// import data from "../data"
import axios from "../api/axios";

export default function Products() {
  const [data, setData] = useState([]);
  const handleDelete = useCallback(async (ID) => {


    const response = await axios.delete(`products/${ID}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
  }, []);

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
  }, [data, handleDelete]);

  const products = data.map((item, index) => {
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
    <>
      <h1 className="text-center mt-5">Products</h1>
      <div className="d-flex  align-items-center mt-5 w-75 flex-wrap mx-auto">
        {products}
      </div>
    </>
  );
}