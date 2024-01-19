import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (token) => {
        // Decode the token to get user information
        const decodedUser = decode(token);

        setUser(decodedUser);
        localStorage.setItem('token', token);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
    };

    const isAuthenticated = () => !!user;

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

const decode = (token) => {
    // Use jwt-decode to decode the token
    // You can replace this with your own decoding logic
    return {};
};

export { AuthProvider, useAuth };