import { useState, useEffect } from 'react';
import { getProfile } from '../services/authService';

const useProfile = (accessToken: string) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [profile, setProfile] = useState<any>(null);

    const fetchProfile = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getProfile(accessToken);
            setProfile(data);
        } catch (err: any) {
            setError(err.message || 'An error occurred while fetching the profile.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (accessToken) {
            fetchProfile();
        }
    }, [accessToken]);

    return { loading, error, profile, fetchProfile };
};

export default useProfile;