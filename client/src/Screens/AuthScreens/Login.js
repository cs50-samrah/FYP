import { Link, useNavigate } from 'react-router-dom';

import React from 'react'
import { useState } from 'react';
import './Login.css'
import api from '../../utils/fetcher';

import signUpImage from '../../Assets/signup.png'
import googleicon from '../../Assets/googleicon.png'
import fbicon from '../../Assets/fb.png'


export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();


    const onSignIn = () => {
        const data = {
            email,
            password
        }
        if (data.email.length > 0 && data.password.length > 0) {
            api.post('/auth/login', data)
                .then((res) => {
                    console.log(res)
                    if (res.data.status) {
                        alert('you have signedIn')
                        navigate('/');
                    }
                    else {
                        alert(res.data.message)
                    }
                })
                .catch((err) => { console.log(err) });
        }
        else {
            // alert("Fields are empty");
            alert("Fields are empty");

        }
    }


    return (
        <>
            <div className='body'>
                <div className="container loginBox my-4">
                    <div className="loginLeft ">
                        <img src={signUpImage} alt="Error!" className='loginImg' />
                    </div>
                    <div className="loginRight ">
                        <div className="loginHeadings">

                            <div className="loginHeading2 my-5">
                                <h2>Kids Goods Hub</h2>
                            </div>
                        </div>
                        <div className="loginBtns">


                            <div className="input-fields">
                                <div className="login-email-container">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id='email' name='email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                                </div>


                                <div className="login-password-container">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" id='password' name='password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                                </div>

                                <div className='d-flex justify-content-center' >
                                    <div className="button" id='loginBtn' onClick={onSignIn}>
                                        <p>Login</p>
                                    </div>
                                </div>
                                <div className="last-line">
                                    <p>Don't have an account? <span> <Link to="/signup">Register </Link> </span></p>
                                </div>
                                <div className='d-flex justify-content-center' >
                                    <Link to="/" style={{ color: '#DB915E' }}  >Go Home </Link>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>

            </div>


        </>
    )
}
