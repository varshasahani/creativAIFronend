import React, { useEffect, useState } from 'react';
import styles from './ProfileCard.module.css';
import { getProfile } from '../../services/authService.ts';

const ProfileCard: React.FC = () => {
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            setError(null);
            try {
                const accessToken = localStorage.getItem('accessToken'); // Retrieve the access token from localStorage
                if (!accessToken) {
                    throw new Error('Access token is missing. Please log in again.');
                }
                const data = await getProfile(accessToken);
                console. log('Profile data:', data);
                setProfile(data.user); // Populate the profile state with the fetched data
            } catch (err: any) {
                setError(err.message || 'An error occurred while fetching the profile.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    return (
        <div className={styles.card}>
            <h2 className={styles.title}>User Profile</h2>
            {loading && <p className={styles.loading}>Loading...</p>}
            {error && <p className={styles.error}>Error: {error}</p>}
            {profile && (
                <div className={styles.details}>
                    <p>
                        <strong>Name:</strong> {profile.name}
                    </p>
                    <p>
                        <strong>Email:</strong> {profile.email}
                    </p>
                    <p>
                        <strong>Phone:</strong> {profile.phone || 'N/A'}
                    </p>
                    <p>
                        <strong>Company:</strong> {profile.company || 'N/A'}
                    </p>
                    <p>
                        <strong>Job Title:</strong> {profile.jobTitle || 'N/A'}
                    </p>
                </div>
            )}
        </div>
    );
};

export default ProfileCard;