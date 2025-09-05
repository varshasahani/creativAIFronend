import React from 'react';
import styles from './AnalyticsCard.module.css';

const AnalyticsCard = () => {
    const analyticsData = [
        {
            id: 1,
            title: 'Number of Contents Generated',
            value: '120',
        },
        {
            id: 2,
            title: 'Platform-wise Content Distribution',
            value: 'Facebook: 40, Instagram: 50, Twitter: 30',
        },
        {
            id: 3,
            title: 'Engagement (Likes, Comments, Shares)',
            value: 'Likes: 500, Comments: 120, Shares: 80',
        },
        {
            id: 4,
            title: 'Top Performing Content',
            value: 'Post Title: "How to Boost Engagement"',
        },
        {
            id: 5,
            title: 'Generated vs Published Content',
            value: 'Generated: 120, Published: 100',
        },
    ];

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Analytics</h2>
            <div className={styles.grid}>
                {analyticsData.map((data) => (
                    <div key={data.id} className={styles.card}>
                        <h3 className={styles.cardTitle}>{data.title}</h3>
                        <p className={styles.cardValue}>{data.value}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AnalyticsCard;