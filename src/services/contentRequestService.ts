import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://content-creation-engine-production.up.railway.app/api/v1';

// Service for generating content
export const createContentRequest = async (payload: any, accessToken: string): Promise<any> => {
    try {
        const response = await axios.post(`${BASE_URL}/content-requests/structured`, payload, {
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
    userId: string,
    accessToken: string,
    page: number = 1,
    limit: number = 10
): Promise<any> => {
    try {
        const response = await axios.get(`${BASE_URL}/content-requests/user/${userId}`, {
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