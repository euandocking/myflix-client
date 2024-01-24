import axios from 'axios';

const API_URL = process.env.REACT_APP_VIDEO_API;

const api = axios.create({
  baseURL: API_URL,
});

// Function to get the JWT token from wherever you have stored it (localStorage, Redux store, etc.)
const getAuthToken = () => {
  // Retrieve the token from where you store it
  // For example, if you store it in localStorage:
  return localStorage.getItem('token');
};

export const fetchVideos = async () => {
  try {
    const token = getAuthToken();
    const response = await api.get('/api/videos', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw error;
  }
};

export const fetchVideo = async (videoId) => {
  try {
    const token = getAuthToken();

    const response = await api.get(`/api/videos/${videoId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Error fetching video with id ${videoId}:`, error);
    throw error;
  }
};
