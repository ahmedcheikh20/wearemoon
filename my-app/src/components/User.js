import { useState, useEffect } from "react";
import "../styles/users.css";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";


export default function User({user}) {
  return (
    <div
    className={
      "d-flex justify-content-start align-items-center mt-5 w-75 flex-wrap mx-auto"
    }
  >
    <Card style={{ width: "21.5rem", margin: ".5rem" }}>
      <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
      <Card.Body>
        <Card.Title>{`${user.first_name} ${user.last_name}`}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>{user.email}</ListGroupItem>
      </ListGroup>
    </Card>
  </div>
  )
}

