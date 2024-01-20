import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from './Home';
import VideoPage from './components/VideoPage';
import VideoDetail from './components/VideoDetail';
import AddVideo from './components/AddVideo';
import { useAuth } from './AuthContext';

const App = () => {
  const { isAuthenticated, logout } = useAuth();

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
                  <Link to="/video-catalog">Video Catalog</Link>
                </li>
                <li>
                  <Link to="/add-video">Add Video</Link>
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

export default App;