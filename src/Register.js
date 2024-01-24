import React, { useState } from 'react';
import userApi from './userApi';
import './AuthStyles.css'; // Import the CSS file for styling

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const registerUser = async () => {
        try {
            // Use the api instance to make requests
            await userApi.post('/api/users', { username, password });
            alert('User registered successfully!');
            setUsername('');
            setPassword('');
        } catch (error) {
            console.error('Error registering user:', error);
            alert('Error registering user. Please try again.');
        }
    };

    return (
        <div className="auth-container">
            <h1 className="auth-heading">Registration Page</h1>
            <input
            className="auth-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
            <input
            className="auth-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <button className="auth-button" onClick={registerUser}>
            Register User
            </button>
        </div>
    );
};

export default Register;