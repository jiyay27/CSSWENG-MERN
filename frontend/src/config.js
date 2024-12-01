import axios from 'axios';

const config = {
    API_URL: process.env.REACT_APP_API_URL || 'https://innovasion-enterprise.onrender.com'
};

// Add axios defaults
axios.defaults.baseURL = config.API_URL;
axios.defaults.timeout = 10000; // 10 second timeout
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Add interceptor for error handling
axios.interceptors.response.use(
    response => response,
    error => {
        console.error('Axios Error:', error);
        return Promise.reject(error);
    }
);

export default config;