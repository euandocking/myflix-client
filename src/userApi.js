import axios from 'axios';

const userApi = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000', // Use REACT_APP_API_URL if set, otherwise default to localhost
});

export default userApi;