import React from "react";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";

export default function ProductComponent(props) {
  return (
    <>
      <>
        <Card style={{ width: "21.5rem" ,margin:".5rem"  }}>
          <Card.Img variant="top" src={`../images/${props.img}`} />
          <Card.Body>
            <Card.Title>{props.title}</Card.Title>
            <Card.Text>{props.description}</Card.Text>
            <Card.Text>From ${props.price} person</Card.Text>
            <div className="d-flex  w-100 justify-content-between align-items-center">
              <Button variant="primary">Update</Button>
              <Button variant="btn btn-danger">Delete</Button>
            </div>
          </Card.Body>
        </Card>
      </>
    </>
  );
}
