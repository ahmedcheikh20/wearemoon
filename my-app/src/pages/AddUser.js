import React, {useState} from "react";
import { createRef } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

import { Form, Button, Stack ,InputGroup, Col} from "react-bootstrap";
export default function AddUser() {
  const navigate = useNavigate();
  const formData = createRef();
  const [pic, setPic] = useState("");
  const [loading, setLoading] = useState(false);


  const add = async (event) => {
    event.preventDefault();

    const newUser = {
      first_name: formData.current.first_name.value,
      last_name: formData.current.last_name.value,
      email: formData.current.email.value,
      password: formData.current.password.value,
      role: formData.current.role.value,
      image: pic
    };
   
    try {
      await axios.post("users/signup", JSON.stringify(newUser), {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      navigate("/users", { replace: true });
    } catch (err) {
      console.log(err);
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
          console.log(error);
          setLoading(false);
        });
    } else {
      setLoading(false);

      return;
    }
  };

  return (
    <Stack gap={2} className="col-md-6 mt-5 px-sm-5    mx-auto">
        <h1 className="text-center">Add User</h1>
      <Form onSubmit={add}  ref={formData} >
        <Form.Group md="4" controlId="formBasicProductName" name="first_name">
          <Form.Label>First name</Form.Label>
          <Form.Control 
            type="text"
            placeholder="first name"
            name="first_name"
            required
          />
        </Form.Group>
        <Form.Group md="4" controlId="formBasicProductName" name="last_name">
          <Form.Label>lastName</Form.Label>
          <Form.Control
            type="text"
            placeholder="last name"
            name="last_name"
            required
          />
        </Form.Group>
        <Form.Group md="4 " controlId="formBasicPrice" name="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="email"
            name="email"
            required
          />
        </Form.Group>
        <Form.Group md="4 " controlId="formBasicPassword" name="password" >
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" name="password" required />
        </Form.Group>


        <Form.Group controlId="fromGridstate" name="role">
          <Form.Label>Role</Form.Label>
          <Form.Select name="role">
            <option value="admin" >admin</option>
            <option value="agent" >agent</option>
          </Form.Select>
        </Form.Group>


        <Form.Group md="4" controlId="formBasicQty" name="image">
          <Form.Label>Photo:</Form.Label>
          <Form.Control
            type="file"
            placeholder="description"
            name="image"
            onChange={(e) => picInput(e.target.files[0])}
            required
          />
        </Form.Group>
        <Button className="mt-4" variant="primary" type="submit" disabled={!pic ? true : false}>
          {" "}
          Add User
        </Button>
      </Form>
    </Stack>
  );
}