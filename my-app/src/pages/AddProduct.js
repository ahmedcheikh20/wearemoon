import React, { useState } from "react";

import { Form, Button, Stack, Alert } from "react-bootstrap";
import { createRef } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function AddProduct() {
  const navigate = useNavigate();
  const formData = createRef();
  const [error, setError] = useState("");

  // addproduct handler method
  const [loading, setLoading] = useState(false);
  const [pic, setPic] = useState("");

  const add = async (event) => {
    event.preventDefault();

    const newProduct = {
      title: formData.current.product_name.value,
      price: Number(formData.current.price.value),
      description: formData.current.description.value,
      image: pic,
    };

    try {
      await axios.post("products", JSON.stringify(newProduct), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      navigate("/", { replace: true });
    } catch (err) {
      setError("Bad request");
    }
  };

  const picInput = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      return setLoading(false);
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "freemarket");
      data.append("cloud_name", process.env.REACT_APP_cloud_name);
      fetch(process.env.REACT_APP_CLOUDINARY, {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setLoading(false);
        })
        .catch((error) => {
          
          setLoading(false);
        });
    } else {
      setLoading(false);

      return;
    }
  };

  return (
    <Stack gap={2} className="col-md-6 mt-5 px-sm-5    mx-auto">
      <Form onSubmit={add} ref={formData}>
        <Form.Group md="4" controlId="formBasicProductName" name="product_name">
          <Form.Label>Product Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Product Name"
            name="product_name"
            required
          />
        </Form.Group>

        <Form.Group md="4 " controlId="formBasicPrice">
          <Form.Label>Price:</Form.Label>
          <Form.Control
            type="number"
            placeholder="Price"
            name="price"
            required
          />
        </Form.Group>

        <Form.Group md="4" controlId="formBasicQty" name="description">
          <Form.Label>Description:</Form.Label>
          <Form.Control
            type="texte"
            placeholder="description"
            name="description"
            required
          />
        </Form.Group>

        <Form.Group md="4" controlId="formBasicQty">
          <Form.Label>Photo:</Form.Label>
          <Form.Control
            type="file"
            placeholder="description"
            onChange={(e) => picInput(e.target.files[0])}
            name="image"
            required
          />
        </Form.Group>
        <Button
          className="mt-4"
          variant="primary"
          type="submit"
          disabled={!pic ? true : false}
        >
          {" "}
          Add to Product
        </Button>
      </Form>
      <Alert>{error}</Alert>
    </Stack>
  );
}
