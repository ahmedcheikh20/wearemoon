import React, {useState, useRef } from "react";
import { Card, FormControl, InputGroup } from "react-bootstrap";
import { Button } from "react-bootstrap";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { AiTwotoneDelete } from "react-icons/ai";

export default function PackComponent(props) {
  const [Update, setUpdate] = useState(false);
  const { auth } = useAuth();
  const title = useRef("");
  const price = useRef("");

  const showUpdate = () => {
    setUpdate(!Update);
  };

  const updateTitle = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `packs/${e.target.id}`,
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
    try {
      const response = await axios.patch(
        `packs/${e.target.id}`,
        JSON.stringify({ price: price.current.value }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      setUpdate(false);
    } catch {}
  };

  return (
    <>
      <>
        <Card style={{ width: "22.5rem" }} className="shadow-sm mb-5 mx-5 zoom">
          <Card.Img variant="top" src={props.img} height="220" />
          <Card.Body>
            <Card.Title>{props.title}</Card.Title>
            
            {Update && (
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="update pack name"
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
                  placeholder="update the price"
                  aria-describedby="basic-addon2"
                  ref={price}
                />
                <Button
                  variant="outline-secondary"
                  id={props.id}
                  onClick={updatePrice}
                >
                  Update
                </Button>
              </InputGroup>
            )}
            <div className="d-flex  w-100 justify-content-between align-items-center">
              {(auth.role[0] === "admin" || auth.role[0] === "agent") && (
                <Button variant="primary" onClick={showUpdate} id={props.id}>
                  Update
                </Button>
              )}
              {auth.role[0] === "admin" && (
                <Button
                  variant="btn btn-danger"
                  id={props.id}
                  onClick={()=>props.handleDelete(props.id)}
                >
                 <AiTwotoneDelete   size={28}/>
                </Button>
              )}
            </div>
          </Card.Body>
        </Card>
      </>
    </>
  );
}