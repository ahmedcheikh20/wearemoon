import React ,{useRef, useState , useEffect} from "react";
import useAuth from '../hooks/useAuth'
import { Link, useNavigate, useLocation } from 'react-router-dom';

import axios from '../api/axios';
const LOGIN_URL = '/users/login';


export default function Login () {
    const { setAuth } = useAuth()


    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/"


    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    
    
    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email:email, password:pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            const accessToken = response?.data?.accessToken;
            const role = response?.data?.role;
            const userName = response?.data?.user
            
            window.localStorage.setItem('auth',JSON.stringify({accessToken,role,userName}))
            setAuth({ userName, role, accessToken });
            setEmail('');
            setPwd('');
            navigate(from, { replace: true });
        } catch (err) {
            if (err.response?.status === 400) {
                setErrMsg('Wrong Username or Password');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }
  
    return (
       
            
            <section>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">Email:</label>
                    <input
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                    />
                    <button>Sign In</button>
                </form>
                <p>
                    Need an Account?<br />
                    <span className="line">
                        
                        <Link to="/register">Sign Up</Link>
                    </span>
                </p>
            </section>
     
    ) ;
}
