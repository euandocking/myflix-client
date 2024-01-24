import axios from 'axios';

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
    const response = await api.post('/api/videos', videoData);
    return response.data;
  } catch (error) {
    console.error('Error adding video:', error);
    throw error;
  }
};

export const fetchVideo = async (videoId) => {
  try {
    const response = await api.get(`/api/videos/${videoId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching video with id ${videoId}:`, error);
    throw error;
  }
};