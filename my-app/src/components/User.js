import { useState, useEffect } from "react";
import "../styles/users.css";
import { Card, ListGroup, ListGroupItem ,Button} from "react-bootstrap";
import { AiTwotoneDelete } from "react-icons/ai";
import avatar from "../images/avatar.jpg";

export default function User({ user }) {
  return (
    <div>
      <Card style={{ width: "22.5rem" }} className="shadow-sm   mb-5 mx-5   zoom  rounded">
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
       
          <div className="d-flex flex-row justify-content-between mt-3 mx-2 mb-3 align-content-center">
     
        <Button
         variant="btn btn-primary"
      className="text-white"
                >
                Update
                </Button>
        <Button
               variant="btn btn-danger"
            
                >
                <AiTwotoneDelete   size={28}/>
                </Button>
 
          </div>
    
      </Card>
    </div>
  );
}
