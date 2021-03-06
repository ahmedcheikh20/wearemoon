import React, { useRef, useEffect, useState } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

import { Form, Button, Col, Row, Container, InputGroup } from "react-bootstrap";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,15}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /(.+)@(.+){2,}\.(.+){2,}/;
const REGISTER_URL = "users/signup";

export default function Register() {
  const userRef = useRef();
  const errRef = useRef();

  const [first_name, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [last_name, setlast_name] = useState("");
  const [validLastName, setValidLastName] = useState(false);
  const [last_nameFocus, setLastNameFocus] = useState(false);

  const [email, setemail] = useState("");
  const [validemail, setValidEmail] = useState(false);
  const [emailFocus, setemailFocus] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(first_name));
  }, [first_name]);

  useEffect(() => {
    setValidLastName(USER_REGEX.test(last_name));
  }, [last_name]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [first_name, last_name, pwd, matchPwd]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(first_name);
    const v2 = USER_REGEX.test(last_name);
    const v3 = EMAIL_REGEX.test(email);
    const v4 = PWD_REGEX.test(pwd);
    if (!v1 || !v2 || !v3 || !v4) {
      setErrMsg("Invalid Entry");
      return;
    }

    axios
      .post(
        REGISTER_URL,
        JSON.stringify({
          first_name,
          last_name,
          email,
          password: pwd,
          role: "user",
          image: "avatar",
        }),
        {
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
          },
        }
      )
      .then((rst) => {
        setUser("");
        setPwd("");
        setMatchPwd("");
        setlast_name("");
        setemail("");
        navigate("login", { replace: true });
      })
      .catch((err) => {
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 409) {
          setErrMsg("email Taken");
        } else {
          setErrMsg("Registration Failed");
        }
        errRef.current.focus();
      });
  };

  return (
    <>
      (
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
            <h1 className="text-center">Register</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label htmlFor="username">
                  Firstname:
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validName ? "valid" : "hide"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validName || !first_name ? "hide" : "invalid"}
                  />
                </Form.Label>
                <Form.Control
                  type="text"
                  id="username"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  value={first_name}
                  required
                  aria-invalid={validName ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                />
                <p
                  id="uidnote"
                  className={
                    userFocus && first_name && !validName
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  4 to 24 characters.
                  <br />
                  Must begin with a letter.
                  <br />
                  Letters, numbers, underscores, hyphens allowed.
                </p>
              </Form.Group>

              <Form.Group>
                <Form.Label htmlFor="last_name">
                  LastName:
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validLastName ? "valid" : "hide"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validLastName || !last_name ? "hide" : "invalid"}
                  />
                </Form.Label>
                <Form.Control
                  type="text"
                  id="last_name"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setlast_name(e.target.value)}
                  value={last_name}
                  required
                  aria-invalid={validLastName ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setLastNameFocus(true)}
                  onBlur={() => setLastNameFocus(false)}
                />
                <p
                  id="uidnote"
                  className={
                    last_nameFocus && last_name && !validLastName
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  4 to 24 characters.
                  <br />
                  Must begin with a letter.
                  <br />
                  Letters, numbers, underscores, hyphens allowed.
                </p>
              </Form.Group>

              <Form.Group>
                <Form.Label htmlFor="email">
                  Email:
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validemail ? "valid" : "hide"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validemail || !email ? "hide" : "invalid"}
                  />
                </Form.Label>
                <Form.Control
                  type="text"
                  id="email"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setemail(e.target.value)}
                  value={email}
                  required
                  aria-invalid={validemail ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setemailFocus(true)}
                  onBlur={() => setemailFocus(false)}
                />
                <p
                  id="uidnote"
                  className={
                    emailFocus && email && !validemail
                      ? "instructions"
                      : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  Must be valid email
                </p>
              </Form.Group>

              <Form.Group>
                <Form.Label htmlFor="password">
                  Password:
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validPwd ? "valid" : "hide"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validPwd || !pwd ? "hide" : "invalid"}
                  />
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    type={isPasswordVisible ? "text" : "password"}
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={pwd}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                  />
                  <InputGroup.Text
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  >
                    {isPasswordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </InputGroup.Text>
                </InputGroup>
                <p
                  id="pwdnote"
                  className={
                    pwdFocus && !validPwd ? "instructions" : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  8 to 24 characters.
                  <br />
                  Must include uppercase and lowercase letters, a number and a
                  special character.
                  <br />
                  Allowed special characters:{" "}
                  <span aria-label="exclamation mark">!</span>{" "}
                  <span aria-label="at symbol">@</span>{" "}
                  <span aria-label="hashtag">#</span>{" "}
                  <span aria-label="dollar sign">$</span>{" "}
                  <span aria-label="percent">%</span>
                </p>
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="confirm_pwd">
                  Confirm Password:
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={validMatch && matchPwd ? "valid" : "hide"}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    className={validMatch || !matchPwd ? "hide" : "invalid"}
                  />
                </Form.Label>
                <InputGroup>
                  <Form.Control
                    type={isPasswordVisible ? "text" : "password"}
                    id="confirm_pwd"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    value={matchPwd}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                  />
                  <InputGroup.Text
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                  >
                    {isPasswordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </InputGroup.Text>
                </InputGroup>
                <p
                  id="confirmnote"
                  className={
                    matchFocus && !validMatch ? "instructions" : "offscreen"
                  }
                >
                  <FontAwesomeIcon icon={faInfoCircle} />
                  Must match the first password input field.
                </p>
              </Form.Group>

              <Button
                className="mt-4"
                onClick={handleSubmit}
                disabled={
                  !validName ||
                  !validPwd ||
                  !validMatch ||
                  !validemail ||
                  !validLastName
                    ? true
                    : false
                }
              >
                Sign Up
              </Button>
            </Form>
            <div>
              Already registered?
              <Link to="/login">Sign In</Link>
            </div>
          </Col>
        </Row>
      </Container>
      )
    </>
  );
}
