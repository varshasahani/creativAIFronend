import axios from 'axios';

const BASE_URL = 'https://content-creation-engine-production.up.railway.app/api/v1'; // Replace with your actual base URL

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add an interceptor to handle token expiration
axiosInstance.interceptors.response.use(
    (response) => response, // Pass through successful responses
    async (error) => {
        const originalRequest = error.config;

        // Check if the error is due to an expired token
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Prevent infinite retry loops

            try {
                // Get the refresh token from localStorage
                const refreshToken = localStorage.getItem('refreshToken');
                if (!refreshToken) {
                    throw new Error('Refresh token is missing. Please log in again.');
                }

                // Request a new access token
                const { data } = await axios.post(`${BASE_URL}/auth/refresh-token`, {
                    refreshToken,
                });

                // Save the new access token in localStorage
                localStorage.setItem('accessToken', data.accessToken);

                // Update the Authorization header for the original request
                originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

                // Retry the original request with the new token
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error('Failed to refresh token:', refreshError);
                // Optionally, log the user out or redirect to the login page
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login'; // Redirect to login page
                return Promise.reject(refreshError);
            }
        }

        // If the error is not due to token expiration, reject it
        return Promise.reject(error);
    }
);

export default axiosInstance;