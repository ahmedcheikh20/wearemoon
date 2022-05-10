import React, { useEffect, useState, useCallback } from "react";
import PackComponent from "../components/PackComponent";

// import data from "../data"
import axios from "../api/axios";
export default function Packs() {
  const [data, setData] = useState([]);
  const handleDelete = useCallback(async (ID) => {
    const response = await axios.delete(`packs/${ID}`, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
  }, []);

  useEffect(() => {
    axios
      .get("packs", {
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
      <PackComponent
        key={`product number ${index}`}
        id={item.id}
        img={item.image}
        title={item.title}
        price={item.price}
        description={item.description}
        handleDelete={handleDelete}
      />
    );
  });
  return (
    <>
      <h1 className="text-center mt-5">Pack's</h1>
      <div className="d-flex  align-items-center mt-5 w-75 flex-wrap mx-auto">
        {products}
      </div>
    </>
  );
}
