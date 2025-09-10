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
                console.log('Profile data:', data);
                setProfile(data); // Populate the profile state with the fetched data
            } catch (err: any) {
                setError(err.message || 'An error occurred while fetching the profile.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return <p className={styles.loading}>Loading...</p>;
    }

    if (error) {
        return <p className={styles.error}>Error: {error}</p>;
    }

    return (
        <div className={styles.card}>
            <h2 className={styles.title}>User Profile</h2>
            {profile && (
                <>
                    {/* Profile Information */}
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>Profile Information</h3>
                        <p><strong>Name:</strong> {profile.name}</p>
                        <p><strong>Email:</strong> {profile.email}</p>
                        <p><strong>Phone:</strong> {profile.phone || 'N/A'}</p>
                        <p><strong>Company:</strong> {profile.company || 'N/A'}</p>
                        {/* <p><strong>Role:</strong> {profile.role || 'N/A'}</p> */}
                    </div>

                    {/* Preferences */}
                    <div className={styles.section}>
                        <h3 className={styles.sectionTitle}>Preferences</h3>
                        <p><strong>Tone:</strong> {profile.preferences.defaultTone}</p>
                        <p><strong>Language:</strong> {profile.preferences.defaultLanguage}</p>
                        <p><strong>Preferred Channels:</strong> {profile.preferences.preferredChannels.join(', ')}</p>
                        <p><strong>Product Type:</strong> {profile.preferences.defaultProductType}</p>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProfileCard;