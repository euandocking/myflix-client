import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import { useAuth } from './AuthContext';

const App = () => {
    const { user, isAuthenticated, logout } = useAuth();

    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        {!isAuthenticated() && (
                            <>
                                <li>
                                    <Link to="/login">Login</Link>
                                </li>
                                <li>
                                    <Link to="/register">Register</Link>
                                </li>
                            </>
                        )}
                        {isAuthenticated() && (
                            <>
                                <li>
                                    <Link to="/home">Home</Link>
                                </li>
                                <li>
                                    <button onClick={logout}>Logout</button>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>

                <Routes>
                    <Route
                        path="/login"
                        element={!isAuthenticated() ? <Login /> : <Navigate to="/home" />}
                    />
                    <Route path="/register" element={<Register />} />
                    {isAuthenticated() && (
                        <Route path="/home" element={<Home />} />
                    )}
                    <Route
                        path="/*"
                        element={!isAuthenticated() ? <Navigate to="/login" /> : <Navigate to="/home" />}
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;