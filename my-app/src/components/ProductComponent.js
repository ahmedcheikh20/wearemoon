import React, { useEffect, useState, useRef } from "react";
import { Card, FormControl, InputGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import axios from "../api/axios";

export default function ProductComponent(props) {
  const [Update, setUpdate] = useState(false);
  const title = useRef("");
  const price = useRef("")

  const showUpdate = () => {
    setUpdate(!Update);
  };

  const updateTitle = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `products/${e.target.id}`,
        JSON.stringify({ title: title.current.value }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      setUpdate(false);
    } catch {}
  };

  const updatePrice = async (e) => {
    e.preventDefault();
       try{
        const response = await axios.patch(`products/${e.target.id}`,
            JSON.stringify({price:price.current.value}),
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        )

        setUpdate(false)
      } catch{

      }
    }

  return (
    <>
      <>
        <Card style={{ width: "21.5rem", margin: ".5rem" }}>
          <Card.Img variant="top" src={props.img} />
          <Card.Body>
            <Card.Title>{props.title}</Card.Title>
            {Update && (
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="update product name"
                  aria-describedby="basic-addon2"
                  ref={title}
                />
                <Button
                  variant="outline-secondary"
                  id={props.id}
                  onClick={updateTitle}
                >
                  Update
                </Button>
              </InputGroup>
            )}
            <Card.Text>{props.description}</Card.Text>
            <Card.Text>From ${props.price} person</Card.Text>
            {Update && (
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="update product name"
                  aria-describedby="basic-addon2"
                  ref={price}
                />
                <Button variant="outline-secondary" id={props.id}  onClick={updatePrice}>
                  Update
                </Button>
              </InputGroup>
            )}
            <div className="d-flex  w-100 justify-content-between align-items-center">
              <Button variant="primary" onClick={showUpdate} id={props.id}>
                Update
              </Button>
              <Button
                variant="btn btn-danger"
                id={props.id}
                onClick={props.handleDelete}
              >
                Delete
              </Button>
            </div>
          </Card.Body>
        </Card>
      </>
    </>
  );
}
