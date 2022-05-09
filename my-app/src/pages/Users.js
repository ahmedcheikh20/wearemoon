import { useState, useEffect } from "react";
import "../styles/users.css";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import axios from "../api/axios";
import User from "../components/User";


export default function Users() {
  const [users, setUsers] = useState([]);
   console.log(users)
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
    <div
      className={
        "d-flex justify-content-start align-items-center mt-5 w-75 flex-wrap mx-auto"
      }
    >
      {users.map(user=>{
          return <User user={user}/>
      })}
    </div>
  );
}
