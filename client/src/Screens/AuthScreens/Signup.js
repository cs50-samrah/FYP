import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import React from 'react'
import './Signup.css'
import api from '../../utils/fetcher';

import signUpImage from '../../Assets/signup.png'
import googleicon from '../../Assets/googleicon.png'
import fbicon from '../../Assets/fb.png'



export default function Signup() {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate();

    const onRegister = async () => {
        try {
            const formData = {
                firstName,
                lastName,
                email,
                phone,
                password,
                confirmPassword
            }

            const { data } = await api.post('/auth/register', formData)
            const { status, message } = data;
            if (status) {
                navigate('/');
            }
            else {
                alert(message);
            }

        } catch (error) {
             alert(error.message)
             console.log(error.message)
        }

    }


    return (
        <div className='body'>
            <div className="container signupBox my-4">
                <div className="signupLeft ">
                    <img src={signUpImage} alt="Error!" className='signupimg' />
                </div>
                <div className="signupRight ">
                    <div className="headings">
                        <div className="heading1">
                            <h3>Welcome To</h3>
                        </div>
                        <div className="heading2">
                            <h2>Kids Goods Hub</h2>
                        </div>
                    </div>
                    <div className="btns">
                        
                      
                    </div>
                    <div className="signup-form " >

                        <div className="name-heading">
                            <label className="label" htmlFor="fname">First Name</label>
                            <label className="label" htmlFor="lname">Last Name</label>
                        </div>
                        <div className="name-fields">
                            <input className="input" type="text" name="fname" id="fname" value={firstName} onChange={(e) => { setFirstName(e.target.value) }} />
                            <input className="input" type="text" name="lname" id="lname" value={lastName} onChange={(e) => { setLastName(e.target.value) }} />

                        </div>
                        <div className="name-heading">
                            <label className="label" htmlFor="email">Email</label>
                            <label className="label" htmlFor="phone">Phone no.</label>
                        </div>
                        <div className="name-fields">
                            <input className="input" type="email" name="email" id="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                            <input className="no-arrow input" type="number" name="phone" id="phone" value={phone} onChange={(e) => { setPhone(e.target.value) }} />

                        </div>
                        <div className="name-heading">
                            <label className="label" htmlFor="password">Password</label>
                            <label className="label" htmlFor="cpassword">Confirm Password</label>
                        </div>
                        <div className="name-fields">
                            <input className="input" type="password" name="password" id="password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                            <input className="input" type="password" name="cpassword" id="cpassword" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} />
                        </div>
                        <div className="boxes">
                            <input className="checkbox" type="checkbox" name='checkbox' id='checkbox' />
                            <label className='boxesLabel' htmlFor="checkbox">&nbsp;&nbsp;I accept all the <span className='boxesSpan'>Terms</span> & <span className='boxesSpan'>Privacy Policy</span></label>
                        </div>
                        <div className="already-user">
                            <Link to='/login' className='already-usera'>Already a user?</Link>
                        </div>
                        <div className="signupBtn" onClick={onRegister}>

                            <p className='signupP'>Signup</p>

                        </div>


                    </div>



                </div>

            </div>
        </div>

    )
}


{/* <div className="parent-container">
                            <form action="#" method="post">
                                <div className="name-container">
                                    <label className= "label" htmlFor="fname">First Name</label>
                                    <input type="text" name="fname" id="fname" />
                                    <label className= "label" htmlFor="lname">Last Name</label>              
                                    <input type="text" name="lname" id="lname" /> 
                                </div>
                                
                                <div className="contact-container">
                                    <label className= "label" htmlFor="email">Email</label>              
                                    <input type="email" name="email" id="email" /> 
                                    <label className= "label" htmlFor="phone">Phone no.</label>              
                                    <input className='no-arrow' type="number" id="phone" name="phone"/>
                                </div>  
                            
<div/>*/}