import React, { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "../api/axios";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { Container, InputGroup } from "react-bootstrap";
const LOGIN_URL = "/users/login";

export default function Login() {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email: email, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.accessToken;
      const role = response?.data?.role;
      const userName = response?.data?.user;

      window.localStorage.setItem(
        "auth",
        JSON.stringify({ accessToken, role, userName })
      );
      setAuth({ userName, role, accessToken });
      setEmail("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (err) {
      if (err.response?.status === 400) {
        setErrMsg("Wrong Username or Password");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };
  return (
    <Container>
      <Row>
        <Col
          className="shadow-lg p-3 mb-5 bg-white rounded mx-auto mt-5 "
          md={6}
        >
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1 className="text-center">Sign In</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                {" "}
                <Form.Control
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="Password"
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                />
                <InputGroup.Text
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  {isPasswordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <Button onClick={handleSubmit}>Sign In</Button>
          </Form>
          <div>
            Need an Account?
            <Link to="/register" className="link ">
              Sign Up
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
