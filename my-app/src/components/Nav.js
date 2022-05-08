import React, { useState } from "react";
import "../styles/nav.css";
import {  Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from '../api/axios';


export default function Nav() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const { auth } = useAuth();
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = async (e) => {
    e.preventDefault();
    
    try {
       await axios.post("users/logout",         
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        );
        window.localStorage.clear()
        setAuth('');       
        navigate("/login", { replace: true });
    } catch (err) {
            console.log(err)
    }
}


  const Element = () => {
    if (!auth) {
      return (
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Signup</Link>
          </li>
        </ul>
      );
    } else if (auth.role[0] === "agent" || auth.role[0] === "user") {
      return (
        <ul>
          <li>
            <Link onClick={handleLogout} to="login">Logout</Link>
          </li>
          <li>
            <Link to="/">Products</Link>
          </li>
          <li>
            <Link to="/packs">Packs</Link>
          </li>
        </ul>
      );
    } else if (auth.role[0] === "admin") {
      return (
        <ul>
          <li>
            <Link onClick={handleLogout} to="login">Logout</Link>
          </li>
          <li>
            <Link to="/">Products</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
            <Link to="/packs">Packs</Link>
          </li>
          <li>
            <Link to="/addProduct">AddProduct</Link>
          </li>
          <li>
            <Link to="/addPack">AddPack</Link>
          </li>
          <li>
            <Link to="/addUser">AddUser</Link>
          </li>
        </ul>
      );
    }
  };

  return (
    <nav className="navigation">
      <a href="/" className="brand-name">
        WeareMoon
      </a>
      <button
        className="hamburger"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}
      >
        {/* icon from heroicons.com */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="white"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        className={
          isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
        }
      >
        <Element />
      </div>
    </nav>
  );
}
