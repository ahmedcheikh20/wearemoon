import { useState, useEffect } from "react";
import "../styles/users.css";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import axios from "../api/axios";
import User from "../components/User";

export default function Users() {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    axios
      .get("users/all", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((rst) => {
        setUsers(rst.data);
      })
      .catch((err) => {
        setUsers([]);
      });
  }, []);

  return (
    <>
    
        <h1 className="text-center mt-5">User's List</h1>
        <div className="d-flex justify-content-start w-75  align-items-center mt-5 mx-auto flex-wrap">
          {users.map((user) => {
            return <User user={user} />;
          })}
        </div>

    </>
  );
}
