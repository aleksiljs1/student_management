'use client'
import React from "react";
import {useState} from 'react';
import axios from "axios";

const Login = () => {
    const [userName,setUserName] = useState('');
    const [password,setPassword] = useState('');

    const handleUserNameChange  = (event)=>{

        setUserName(event.target.value);

    }
    const handlePasswordChange  = (event)=>{

        setPassword(event.target.value);

    }
    const handleSubmit = (event )=>{
          event.preventDefault();

        axios.post('http://localhost:3000/api/backtest', { userName,password, type: "login" },) //shorthand method in end of doc
            .then(function(response) {
                alert(response.data.message);
            })
            .catch(function(error) {
                alert(error.response?.data.message );
            });
    }

    return (  <div className="signup-container">
            <h2 className="signup">Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="user"
                    placeholder="User"
                    className="user"
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
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;