import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://content-creation-engine-production.up.railway.app/api/v1';

// Helper function to get headers with Authorization
const getHeaders = (accessToken: string) => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
});

// Authentication APIs

// Register User
// export const registerUser = async (payload: any): Promise<any> => {
//     try {
//         const response = await axios.post(`${BASE_URL}/auth/register`, payload, {
//             headers: { 'Content-Type': 'application/json' },
//         });
//         return response.data;
//     } catch (error: any) {
//         console.error('Error registering user:', error.response || error.message);
//         throw error.response?.data || error.message;
//     }
// };
export const registerUser = async (payload: {
    name: string;
    email: string;
    password: string;
    company: string;
    phone: string;
    preferences: {
        defaultTone: string;
        defaultLanguage: string;
        preferredChannels: string[];
        defaultProductType: string;
    };
    brandDescription: string;
}) => {
    try {
        const response = await fetch(`${BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload), // Send the payload as expected by the backend
        });

        if (!response.ok) {
            throw new Error('Registration failed');
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};
export const loginUser = async (payload: { email: string; password: string }): Promise<any> => {
    try {
        // Make the POST request to the login endpoint
        const response = await axios.post(`${BASE_URL}/auth/login`, payload, {
            headers: { 'Content-Type': 'application/json' },
        });
        // Ensure the response contains the necessary fields
        if (!response.data || !response.data.user || !response.data.user?._id) {
            throw new Error('Invalid response from the server. Missing userId.');
        }

        // Return the response data
        return {
            userId: response.data.user?._id, // Extract userId
            email: response.data.user.email, // Extract email
            accessToken: response.data.accessToken, // Extract accessToken
            refreshToken: response.data.refreshToken, // Extract refreshToken
        };
    } catch (error: any) {
        // Log the error for debugging
        console.error('Error logging in user:', error.response || error.message);

        // Throw a user-friendly error message
        throw error.response?.data || { message: 'An error occurred during login.' };
    }
};

// Get Profile
export const getProfile = async (accessToken: string): Promise<any> => {
    try {
        const response = await axios.get(`${BASE_URL}/auth/profile`, {
            headers: getHeaders(accessToken),
        });
        return response.data;
    } catch (error: any) {
        console.error('Error fetching profile:', error.response || error.message);
        throw error.response?.data || error.message;
    }
};

// Refresh Token
export const refreshToken = async (refreshToken: string): Promise<any> => {
    try {
        const response = await axios.post(
            `${BASE_URL}/auth/refresh-token`,
            { refreshToken },
            { headers: { 'Content-Type': 'application/json' } }
        );
        return response.data;
    } catch (error: any) {
        console.error('Error refreshing token:', error.response || error.message);
        throw error.response?.data || error.message;
    }
};

// Change Password
export const changePassword = async (accessToken: string, payload: any): Promise<any> => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/change-password`, payload, {
            headers: getHeaders(accessToken),
        });
        return response.data;
    } catch (error: any) {
        console.error('Error changing password:', error.response || error.message);
        throw error.response?.data || error.message;
    }
};

// Forgot Password
export const forgotPassword = async (payload: any): Promise<any> => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/forgot-password`, payload, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
    } catch (error: any) {
        console.error('Error requesting password reset:', error.response || error.message);
        throw error.response?.data || error.message;
    }
};

// Reset Password
export const resetPassword = async (payload: any): Promise<any> => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/reset-password`, payload, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
    } catch (error: any) {
        console.error('Error resetting password:', error.response || error.message);
        throw error.response?.data || error.message;
    }
};

// Logout
export const logout = async (accessToken: string): Promise<any> => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/logout`, {}, {
            headers: getHeaders(accessToken),
        });
        return response.data;
    } catch (error: any) {
        console.error('Error logging out:', error.response || error.message);
        throw error.response?.data || error.message;
    }
};

// User Management APIs

// Create User (Public)
export const createUser = async (payload: any): Promise<any> => {
    try {
        const response = await axios.post(`${BASE_URL}/users`, payload, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
    } catch (error: any) {
        console.error('Error creating user:', error.response || error.message);
        throw error.response?.data || error.message;
    }
};

// Get All Users (Admin Only)
export const getAllUsers = async (accessToken: string, page: number, limit: number): Promise<any> => {
    try {
        const response = await axios.get(`${BASE_URL}/users`, {
            headers: getHeaders(accessToken),
            params: { page, limit },
        });
        return response.data;
    } catch (error: any) {
        console.error('Error fetching users:', error.response || error.message);
        throw error.response?.data || error.message;
    }
};

// Get User by ID
export const getUserById = async (accessToken: string, userId: string): Promise<any> => {
    try {
        const response = await axios.get(`${BASE_URL}/users/${userId}`, {
            headers: getHeaders(accessToken),
        });
        return response.data;
    } catch (error: any) {
        console.error('Error fetching user by ID:', error.response || error.message);
        throw error.response?.data || error.message;
    }
};

// Update User
export const updateUser = async (accessToken: string, userId: string, payload: any): Promise<any> => {
    try {
        const response = await axios.put(`${BASE_URL}/users/${userId}`, payload, {
            headers: getHeaders(accessToken),
        });
        return response.data;
    } catch (error: any) {
        console.error('Error updating user:', error.response || error.message);
        throw error.response?.data || error.message;
    }
};

