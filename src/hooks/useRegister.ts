import { useState } from 'react';
import { registerUser } from '../services/authService';

interface RegisterPayload {
    name: string;
    email: string;
    password: string;
    company: string;
    jobTitle: string;
    phone: string;
}

const useRegister = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const register = async (payload: RegisterPayload) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            const data = await registerUser(payload);
            setSuccess(true);
            return data; // Return the response for further use
        } catch (err: any) {
            setError(err.message || 'An error occurred during registration.');
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, success, register };
};

export default useRegister;