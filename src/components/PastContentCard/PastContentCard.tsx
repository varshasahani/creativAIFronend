import React, { useEffect } from 'react';
import useContentRequest from '../../hooks/useContentRequest.ts';
import styles from './PastContentCard.module.css';

interface PastContentCardProps {
    userId: string;
    accessToken: string;
}

const PastContentCard: React.FC<PastContentCardProps> = ({ userId, accessToken }) => {
    const { loading, error, pastContent, fetchPastContent } = useContentRequest();

    useEffect(() => {
        const storedUserId = userId || localStorage.getItem('userId'); // Fallback to localStorage
        if (storedUserId && accessToken) {
            fetchPastContent(accessToken); // Call fetchPastContent
        }
    }, [userId, accessToken, fetchPastContent]);

    if (!userId && !localStorage.getItem('userId')) {
        return <p>User ID is not available. Please log in again.</p>;
    }
    return (
        <div className={styles.card}>
            <h2 className={styles.title}>Past Content Requests</h2>

            {loading && <p className={styles.loading}>Loading...</p>}
            {error && <p className={styles.error}>Error: {error}</p>}

            {!loading && !error && pastContent.length === 0 && (
                <p className={styles.noContent}>No past content requests found.</p>
            )}

            <ul className={styles.contentList}>
                {pastContent.map((content) => (
                    <li key={content.id} className={styles.contentItem}>
                        <h3>{content.campaignName}</h3>
                        <p><strong>Description:</strong> {content.userPrompt}</p>
                        <p><strong>Channels:</strong> {content.channels.join(', ')}</p>
                        <p><strong>Created At:</strong> {new Date(content.createdAt).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PastContentCard;