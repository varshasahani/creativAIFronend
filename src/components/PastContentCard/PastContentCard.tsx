import React, { useState } from 'react';
import styles from './PastContentCard.module.css';

interface PastContentCardProps {
    pastContent: any[]; // Replace `any[]` with the appropriate type if available
}

const PastContentCard: React.FC<PastContentCardProps> = ({ }) => {
    const [expandedContent, setExpandedContent] = useState<string | null>(null);
    const pastContent=[
        {
            "_id": "68c1bba17c09ec96352b27f8",
            "requestId": "68c1bb947c09ec96352b27f5",
            "model": "gpt-4o",
            "contentType": "ad_copy",
            "content": {
                "channel": "Instagram",
                "language": "en",
                "tone": "casual",
                "title": "Glow Up with Kumkumadi! 🌟",
                "body": "Hey beauties! 🌿 Ready for radiant, acne-free skin? Our Kumkumadi Face Serum is your new BFF for that natural glow and clear complexion. Perfect for your daily skincare routine! ✨",
                "cta": "Try it now!",
                "meta": {
                    "hashtags": [
                        "#GlowingSkin",
                        "#AcneFree",
                        "#KumkumadiMagic"
                    ],
                    "emojis": [
                        "🌿",
                        "✨"
                    ]
                }
            },
            "status": "draft",
            "createdAt": "2024-01-01T00:00:00.000Z"
        },
        {
            "_id": "68c1bbaa7c09ec96352b27fc",
            "requestId": "68c1bb947c09ec96352b27f5",
            "model": "gpt-4o",
            "contentType": "ad_copy",
            "content": {
                "channel": "Instagram",
                "language": "en",
                "tone": "casual",
                "title": "Glow On with Kumkumadi! ✨",
                "body": "Hey beauties! 🌿 Ready to say goodbye to acne and hello to radiant skin? Our Kumkumadi Face Serum is your skincare BFF. Designed for those who want that natural glow without the fuss. Perfect for your daily routine. 💁‍♀️ Try it now and feel the difference!",
                "cta": "Shop Now",
                "meta": {
                    "hashtags": [
                        "#SkincareGoals",
                        "#GlowUp",
                        "#KumkumadiSerum"
                    ],
                    "emojis": [
                        "🌿",
                        "✨"
                    ]
                }
            },
            "status": "draft",
            "createdAt": "2024-01-01T00:00:00.000Z"
        },
        {
            "_id": "68c1bbaf7c09ec96352b2801",
            "requestId": "68c1bb947c09ec96352b27f5",
            "model": "gpt-4o",
            "contentType": "ad_copy",
            "content": {
                "channel": "Facebook",
                "language": "en",
                "tone": "casual",
                "title": "Unlock Your Natural Glow!",
                "body": "Hey beauties! Ready to let your skin shine? Our Kumkumadi Face Serum is your go-to for that radiant glow and acne-free skin. Packed with natural goodness, it's time to embrace flawless beauty. 🌟 Join our community of glowing goddesses and share your glow-up stories with us! ✨",
                "cta": "Get Yours Now!",
                "meta": {
                    "hashtags": [
                        "#GlowUp",
                        "#AcneFree",
                        "#BeautyRoutine"
                    ],
                    "emojis": [
                        "🌿",
                        "✨"
                    ]
                }
            },
            "status": "draft",
            "createdAt": "2024-01-01T00:00:00.000Z"
        },
        {
            "_id": "68c1bbb77c09ec96352b2805",
            "requestId": "68c1bb947c09ec96352b27f5",
            "model": "gpt-4o",
            "contentType": "ad_copy",
            "content": {
                "channel": "Facebook",
                "language": "en",
                "tone": "casual",
                "title": "Say Hello to Radiant, Acne-Free Skin!",
                "body": "Hey beauties! 🌿 Imagine waking up every day with that natural glow and saying goodbye to stubborn acne. Meet your new BFF, Kumkumadi Face Serum! This magic potion is crafted just for you, promising luminous skin and acne control. Ready to shine? ✨ Let's chat about your skincare goals in the comments below!",
                "cta": "Try it now!",
                "meta": {
                    "hashtags": [
                        "#GlowingSkin",
                        "#AcneControl",
                        "#BeautyRoutine"
                    ],
                    "emojis": [
                        "🌿",
                        "✨"
                    ]
                }
            },
            "status": "draft",
            "createdAt": "2024-01-01T00:00:00.000Z"
        }
    ];
    const toggleContent = (id: string) => {
        setExpandedContent((prev) => (prev === id ? null : id));
    };

    return (
        <div className={styles.card}>
            <h2 className={styles.title}>Past Content Requests</h2>

            {/* Check if pastContent is empty or undefined */}
            {(!pastContent || pastContent.length === 0) ? (
                <p className={styles.noContent}>No past content requests found.</p>
            ) : (
                <div className={styles.generatedAds}>
                    {pastContent.map((content) => (
                        <div key={content._id} className={styles.adCard}>
                            {/* Title */}
                            <div className={styles.adHeader} onClick={() => toggleContent(content._id)}>
                                <h3 className={styles.adTitle}>{content.content.title}</h3>
                                <button className={styles.toggleButton}>
                                    {expandedContent === content._id ? 'Hide' : 'Show'}
                                </button>
                            </div>

                            {/* Expanded Content */}
                            {expandedContent === content._id && (
                                <div className={styles.expandedContent}>
                                    <p className={styles.adBody}>{content.content.body}</p>
                                    <p className={styles.adCTA}><strong>{content.content.cta}</strong></p>
                                    <div className={styles.adMeta}>
                                        <p>{content.content.meta.hashtags.join(' ')}</p>
                                        <p>{content.content.meta.emojis.join(' ')}</p>
                                    </div>
                                    <p className={styles.adChannel}>
                                        <strong>Channel:</strong> {content.content.channel}
                                    </p>
                                    <p className={styles.adCreatedAt}>
                                        <strong>Created At:</strong>{' '}
                                        {new Date(content.createdAt).toLocaleString()}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PastContentCard;