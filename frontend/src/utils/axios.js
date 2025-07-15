import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'https://job-mela-website.onrender.com',
  withCredentials: true, // ✅ Sends cookies
});

export default instance;
