import axiosInstance from './axiosInstance.ts';


const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://content-creation-engine-production.up.railway.app/api/v1';

// Service for generating content
export const createContentRequest = async (payload: any): Promise<any> => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            throw new Error('Access token is missing. Please log in again.');
        }
        const response = await axiosInstance.post(`${BASE_URL}/content-requests/generate-channel-content`, payload, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    } catch (error: any) {
        console.error('Error creating content request:', error.response || error.message);
        throw error.response?.data || error.message;
    }
};

// Service for fetching past content requests
export const getUserContentRequests = async (
    page: number = 1,
    limit: number = 10
): Promise<any> => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const userId = localStorage.getItem('userId');
        if (!accessToken || !userId) {
            throw new Error('Access token or User ID is missing. Please log in again.');
        }
        const response = await axiosInstance.get(`${BASE_URL}/content-requests/user/${userId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: { page, limit },
        });
        return response.data;
    } catch (error: any) {
        console.error('Error fetching user content requests:', error.response || error.message);
        throw error.response?.data || error.message;
    }
};