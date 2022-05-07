import React from "react";
import "../styles/addProduct.css";


import { Form, Button } from "react-bootstrap";
import { createRef } from 'react';
import axios from "../api/axios";
import {useNavigate} from "react-router-dom"

export default function AddProduct() {
  const navigate = useNavigate();
  const formData = createRef();
  // addproduct handler method
  const add = async (event)=>{
      event.preventDefault();
      
      const newProduct = {
          title: formData.current.product_name.value,
          price: Number(formData.current.price.value),
          description: formData.current.description.value
      }
      try {
       await axios.post("products",
            JSON.stringify(newProduct),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
        
        
        
        
      
        navigate('/', { replace: true });
    } catch (err) {
        console.log(err)
    }
    
  }
  return (
    <div className="addProduct">
      <Form onSubmit={add} ref={formData}>
        <Form.Group controlId="formBasicProductName">
          <Form.Label>Product Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Product Name"
            name="product_name"
          />
        </Form.Group>

        <Form.Group controlId="formBasicPrice">
          <Form.Label>Price:</Form.Label>
          <Form.Control
            type="number"
            placeholder="Price in Euro"
            name="price"
          />
        </Form.Group>

        <Form.Group controlId="formBasicQty">
          <Form.Label>Description:</Form.Label>
          <Form.Control type="texte" placeholder="description" name="description" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add to Product
        </Button>
      </Form>
    </div>
  );
}
