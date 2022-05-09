import React, { useState } from "react";
import "../styles/nav.css";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import { FaUserAlt } from "react-icons/fa";
import { MdAppRegistration } from "react-icons/md";

export default function Nav() {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const { auth } = useAuth();
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      await axios.post("users/logout", {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      window.localStorage.clear();
      setAuth("");
      navigate("/login", { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  const Element = () => {
    if (!auth) {
      return (
        <ul>
          <li>
            <Link
              to="/login"
              className="d-flex align-items-center justify-content-between"
            >
              <FaUserAlt className="w-50" size={18} />{" "}
              <span className="w-50">Login</span>{" "}
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className="d-flex w-100 align-items-center justify-content-between"
            >
              <MdAppRegistration className="w-50" size={22} />{" "}
              <span className="w-50">SignUp</span>{" "}
            </Link>
          </li>
        </ul>
      );
    } else if (auth.role[0] === "agent" || auth.role[0] === "user") {
      return (
        <ul>
          <li>
            <Link onClick={(e) => handleLogout(e)} to="login">
              Logout
            </Link>
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
            <Link onClick={(e) => handleLogout(e)} to="login">
              Logout
            </Link>
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
    <nav className="navigation d-flex px-5 align-items-center">
      <a href="/" className="brand-name">
        WeareMoon
      </a>
      <button
        className="hamburger"
        onClick={() => setIsNavExpanded(!isNavExpanded)}
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
