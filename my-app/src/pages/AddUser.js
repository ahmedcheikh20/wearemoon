import React from "react";
import { createRef } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

import { Form, Button, Stack ,InputGroup, Col} from "react-bootstrap";
export default function AddUser() {
  const navigate = useNavigate();
  const formData = createRef();


  const add = async (event) => {
    event.preventDefault();

    const newProduct = {
      title: formData.current.product_name.value,
      price: Number(formData.current.price.value),
      description: formData.current.description.value,

    };
  
    try {
      await axios.post("products", JSON.stringify(newProduct), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      navigate("/", { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Stack gap={2} className="col-md-6 mt-5 px-sm-5    mx-auto">
      <Form>
        <Form.Group md="4" controlId="formBasicProductName" name="product_name">
          <Form.Label>First name</Form.Label>
          <Form.Control
            type="text"
            placeholder="first name"
            name="first_name"
            required
          />
        </Form.Group>
        <Form.Group md="4" controlId="formBasicProductName" name="product_name">
          <Form.Label>lastName</Form.Label>
          <Form.Control
            type="text"
            placeholder="last name"
            name="last_name"
            required
          />
        </Form.Group>
        <Form.Group md="4 " controlId="formBasicPrice">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="email"
            name="email"
            required
          />
        </Form.Group>
        <Form.Group md="4 " controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" required />
        </Form.Group>


        <Form.Group  className="mb-3">
      <Form.Label as="legend" column sm={2}>
        Role
      </Form.Label>
      <Col sm={10}>
        <Form.Check
          type="radio"
          label="Admin"
          name="formHorizontalRadios"
          id="formHorizontalRadios1"
        />
        <Form.Check
          type="radio"
          label="Agent"
          name="formHorizontalRadios"
          id="formHorizontalRadios2"
        />
       
      </Col>
    </Form.Group>


        <Form.Group md="4" controlId="formBasicQty">
          <Form.Label>Photo:</Form.Label>
          <Form.Control
            type="file"
            placeholder="description"
            name="image"
            required
          />
        </Form.Group>
        <Button className="mt-4" variant="primary" type="submit">
          {" "}
          Add User
        </Button>
      </Form>
    </Stack>
  );
}
