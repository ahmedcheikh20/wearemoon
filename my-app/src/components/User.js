import { useState, useRef } from "react";

import {
  Card,
  ListGroup,
  ListGroupItem,
  Button,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { AiTwotoneDelete } from "react-icons/ai";
import avatar from "../images/avatar.jpg";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";

export default function User({ user, handleDelete }) {
  const [Update, setUpdate] = useState(false);
  const { auth } = useAuth();
  const first_name = useRef("");
  const last_name = useRef("");
  const showUpdate = () => {
    setUpdate(!Update);
  };
  const updateFirstName = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `users/${e.target.id}`,
        JSON.stringify({ first_name: first_name.current.value }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      setUpdate(false);
    } catch {}
  };

  const updatelast_name = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `users/${e.target.id}`,
        JSON.stringify({ last_name: last_name.current.value }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      setUpdate(false);
    } catch {}
  };

  return (
    <div>
      <Card
        style={{ width: "22.5rem" }}
        className="shadow-sm   mb-5 mx-5   zoom  rounded"
      >
        <Card.Img
          variant="top"
          height="220"
          src={!user.image ? avatar : user.image}
        />
        <Card.Body>
          <Card.Title>{`${user.first_name} ${user.last_name}`}</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>{user.email}</ListGroupItem>
        </ListGroup>
        {Update && (
          <>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="update first name"
                aria-describedby="basic-addon2"
                ref={first_name}
              />
              <Button
                variant="outline-secondary"
                id={user.id}
                onClick={updateFirstName}
              >
                Update
              </Button>
            </InputGroup>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="update last name"
                aria-describedby="basic-addon2"
                ref={last_name}
              />
              <Button
                variant="outline-secondary"
                id={user.id}
                onClick={updatelast_name}
              >
                Update
              </Button>
            </InputGroup>
          </>
        )}
        <div className="d-flex flex-row justify-content-between mt-3 mx-2 mb-3 align-content-center">
          <Button
            variant="btn btn-primary"
            className="text-white"
            onClick={showUpdate}
          >
            Update
          </Button>
          <Button
            variant="btn btn-danger"
            onClick={() => handleDelete(user.id)}
          >
            <AiTwotoneDelete size={28} />
          </Button>
        </div>
      </Card>
    </div>
  );
}
