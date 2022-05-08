import { useState } from "react";
import "../styles/users.css"

export default function Users() {
  const [users, setUsers] = useState();

  return (
    <article className="Users" >
      <h2>Users List</h2>
      {users?.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user?.username}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display</p>
      )}
    </article>
  );
}