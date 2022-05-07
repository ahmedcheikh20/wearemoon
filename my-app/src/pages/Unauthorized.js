import React from 'react'
import { useNavigate } from "react-router-dom"
import "../styles/unauthorized.css"


export default function Unauthorized() {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);
  return (
    <section className="unauthorized" >
    <h1>Unauthorized</h1>
    <br />
    <p>You do not have access to the requested page.</p>
    <div className="flexGrow">
        <button onClick={goBack}>Go Back</button>
    </div>
</section>
  )
}
