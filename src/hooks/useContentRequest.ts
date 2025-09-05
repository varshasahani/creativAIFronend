import { useState } from 'react';
import { createContentRequest, getUserContentRequests } from '../services/contentRequestService.ts';

interface ContentRequestPayload {
    userPrompt: string;
    tone: string;
    language: string;
    productType: string;
    aiProvider: string;
    aiModel: string;
}

const useContentRequest = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [response, setResponse] = useState<any>(null);
    const [pastContent, setPastContent] = useState<any[]>([]);

    // Logic for generating content
    const sendContentRequest = async (payload: ContentRequestPayload, accessToken: string) => {
        setLoading(true);
        setError(null);
        try {
            const data = await createContentRequest(payload, accessToken);
            setResponse(data);
        } catch (err: any) {
            setError(err.message || 'An error occurred while generating content.');
        } finally {
            setLoading(false);
        }
    };

    // Logic for fetching past content requests
    const fetchPastContent = async (userId: string, accessToken: string, page: number = 1, limit: number = 10) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getUserContentRequests(userId, accessToken, page, limit);
            setPastContent(data.contentRequests || []);
        } catch (err: any) {
            setError(err.message || 'An error occurred while fetching past content.');
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, response, pastContent, sendContentRequest, fetchPastContent };
};

export default useContentRequest;