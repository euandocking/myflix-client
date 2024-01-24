import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate, useLocation } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import VideoPage from './components/VideoPage';
import VideoDetail from './components/VideoDetail';
import AddVideo from './components/AddVideo';
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
            <NavItem to="/login" text="Login" />
            <NavItem to="/register" text="Register" />
            {isAuthenticated() && (
              <>
                <NavItem to="/home" text="Home" />
                <NavItem to="/video-catalog" text="Video Catalog" />
                <NavItem to="/add-video" text="Add Video" />
                <li>
                  <button className="logout-button" onClick={logout}>
                    Logout
                  </button>
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
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/video-catalog" element={<VideoPage />} />
              <Route path="/add-video" element={<AddVideo />} />
              {/* Add the VideoDetail route */}
              <Route path="/videos/:videoId" element={<VideoDetail />} />
            </>
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