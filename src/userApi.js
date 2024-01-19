import axios from 'axios';

const userApi = axios.create({
    baseURL: process.env.REACT_APP_USER_API, // Use REACT_APP_API_URL if set, otherwise default to localhost
});

export default userApi;