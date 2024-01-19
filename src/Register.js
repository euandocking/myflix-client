import React, { useState } from 'react';
import userApi from './userApi';

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
        <div>
            <h1>Registration Page</h1>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={registerUser}>Register User</button>
        </div>
    );
};

export default Register;