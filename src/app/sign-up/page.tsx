'use client'
import React from "react";
import {useState} from 'react';
import axios from "axios";



 const SignIn = () => {
     const [userName,setUserName] = useState(''); //hook set up
    const [password,setPassword] = useState('');

    const handleUserNameChange  = (event)=>{
        setUserName(event.target.value);
    }

    const handlePasswordChange  = (event)=>{

        setPassword(event.target.value); // grabbing for the usestate hook
    }

    const handleSubmit = (event)=>{
    event.preventDefault();
        axios.post('http://localhost:3000/api/backtest', { userName,password, type: "register" },) //shorthand method in end of doc
            .then(function(response) {
                alert(response.data.message);
            })
            .catch(function(error) {
                alert(error.response?.data.message );
            })// catching the corresponding errors (hell)
        alert( userName)
        alert(password) //variables  succesfully registered for pass.
    }

    return (  <div className="signup-container">
            <h2 className="signup">Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="username"
                    required
                    onChange={handleUserNameChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="password"
                    required
                    onChange={handlePasswordChange}
                />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignIn;