import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useLocation } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import VideoPage from './components/VideoPage';
import VideoDetail from './components/VideoDetail';
import { useAuth } from './AuthContext';
import './App.css';

const App = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <Router>
      <div className="app-container">
        <header>
          <h1 className="app-heading">MyFlix</h1>
        </header>

        <nav className="nav-bar">
          <ul className="nav-list">
            {!isAuthenticated() && (
              <>
                <NavItem to="/login" text="Login" />
                <NavItem to="/register" text="Register" />
              </>
            )}
            {isAuthenticated() && (
              <>
                <NavItem to="/video-catalog" text="Video Catalog" />
              </>
            )}
          </ul>
        </nav>

        <Routes>
          <Route
            path="/login"
            element={!isAuthenticated() ? <Login /> : <Navigate to="/video-catalog" />}
          />
          <Route path="/register" element={<Register />} />
          {isAuthenticated() && (
            <>
              <Route path="/video-catalog" element={<VideoPage />} />
              <Route path="/videos/:videoId" element={<VideoDetail />} />
            </>
          )}
          <Route
            path="/*"
            element={isAuthenticated() ? <Navigate to="/video-catalog" /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
};

const NavItem = ({ to, text }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <li className={isActive ? 'active' : ''}>
      <Link to={to}>{text}</Link>
    </li>
  );
};

export default App;