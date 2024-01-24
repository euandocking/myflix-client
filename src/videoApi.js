import axios from 'axios';
import { useAuth } from './AuthContext'; // Update the path accordingly

const API_URL = process.env.REACT_APP_VIDEO_API;

const api = axios.create({
  baseURL: API_URL,
});

export const fetchVideos = async () => {
  try {
    const response = await api.get('/api/videos');
    return response.data;
  } catch (error) {
    console.error('Error fetching videos:', error);
    throw error;
  }
};

export const addVideo = async (videoData) => {
  try {
    const { getAuthToken } = useAuth(); // Retrieve the useAuth hook from your AuthContext
    const token = getAuthToken(); // Retrieve the JWT
    const response = await api.post('/api/videos', videoData, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding video:', error);
    throw error;
  }
};

export const fetchVideo = async (videoId) => {
  try {
    const { getAuthToken } = useAuth(); // Retrieve the useAuth hook from your AuthContext
    const token = getAuthToken(); // Retrieve the JWT
    const response = await api.get(`/api/videos/${videoId}`, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching video with id ${videoId}:`, error);
    throw error;
  }
};
