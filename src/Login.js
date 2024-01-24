import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import userApi from './userApi';
import './AuthStyles.css'; // Import the CSS file for styling

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const loginUser = async () => {
        try {
          // Make a request to your server for authentication
          const response = await userApi.post('/api/login', { username, password });
      
          // Assuming your server returns both user ID and token upon successful login
          const { userId, token } = response.data;
      
          // Call the login function to set the user and token in the context
          login(token, userId);
      
          // Redirect to the home page after successful login
          navigate('/home');
        } catch (error) {
          console.error('Error during login:', error);
          alert('Login failed. Please check your username and password.');
        }
      };

    return (
      <div className="auth-container">
        <h1 className="auth-heading">Login Page</h1>
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
        <button className="auth-button" onClick={loginUser}>
          Login
        </button>
      </div>
    );
};

export default Login;