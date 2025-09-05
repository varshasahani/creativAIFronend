import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://dpeloytest.onrender.com/api/v1';

// Helper function to get headers with Authorization
const getHeaders = (accessToken: string) => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${accessToken}`,
});

// Authentication APIs

// Register User
export const registerUser = async (payload: any): Promise<any> => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/register`, payload, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
    } catch (error: any) {
        console.error('Error registering user:', error.response || error.message);
        throw error.response?.data || error.message;
    }
};

// Login User
export const loginUser = async (payload: any): Promise<any> => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/login`, payload, {
            headers: { 'Content-Type': 'application/json' },
        });
        return response.data;
    } catch (error: any) {
        console.error('Error logging in user:', error.response || error.message);
        throw error.response?.data || error.message;
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

