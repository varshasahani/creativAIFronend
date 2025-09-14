import React, { useEffect, useState } from 'react';
import { getUserContentRequests } from '../../services/contentRequestService.ts';
import styles from './PastContentCard.module.css';

const ITEMS_PER_PAGE = 12; // Number of items per page

const PastContentCard: React.FC = () => {
    const [expandedContent, setExpandedContent] = useState<string | null>(null);
    const [pastContent, setPastContent] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1); // Current page
    const [totalPages, setTotalPages] = useState<number>(1); // Total pages

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // Set loading to true before the request
                const data = await getUserContentRequests(currentPage, ITEMS_PER_PAGE); // Fetch data for the current page
                setPastContent(data.requests);
                setTotalPages(data.totalPages); // Set total pages from the API response
            } catch (err: any) {
                console.error('Error fetching content:', err); // Log the error
                setError(err.message || 'Failed to fetch content.');
            } finally {
                setLoading(false); // Set loading to false after the request
            }
        };

        fetchData();
    }, [currentPage]); // Refetch data when the page changes

    const toggleContent = (id: string) => {
        setExpandedContent((prev) => (prev === id ? null : id));
    };

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage); // Update the current page
        }
    };

    return (
        <div className={styles.card}>
            <h2 className={styles?.title}>Past Content Requests</h2>

            {/* Show loading indicator */}
            {loading && <p className={styles.loading}>Loading...</p>}

            {/* Show error message */}
            {error && <p className={styles.error}>{error}</p>}

            {/* Check if pastContent is empty or undefined */}
            {!loading && !error && (!pastContent || pastContent.length === 0) ? (
                <p className={styles.noContent}>No past content requests found.</p>
            ) : (
                <div className={styles.generatedAds}>
                    {pastContent.map((content) => {
                        // Parse the generatedContent JSON string
                        let parsedContent;
                        try {
                            parsedContent = content.generatedContent;
                        } catch (err) {
                            console.error('Error parsing generatedContent:', err);
                            parsedContent = {
                                content: {
                                    title: 'Error parsing content',
                                    body: '',
                                    cta: '',
                                    meta: { hashtags: [], emojis: [] },
                                    channel: '',
                                },
                            };
                        }

                        const title = parsedContent.title || 'No Title Available';
                        const body = parsedContent.body || 'No Body Available';
                        const cta = parsedContent.cta || 'No CTA Available';
                        const hashtags = parsedContent.meta?.hashtags?.join(' ') || '';
                        const emojis = parsedContent.meta?.emojis?.join(' ') || '';
                        const channel = parsedContent.channel || 'No Channel Available';

                        return (
                            <div key={content._id} className={styles.adCard}>
                                {/* Title */}
                                <div className={styles.adHeader} onClick={() => toggleContent(content._id)}>
                                    <h3 className={styles.adTitle}>{title}</h3>
                                    <button className={styles.toggleButton}>
                                        {expandedContent === content._id ? 'Hide' : 'Show'}
                                    </button>
                                </div>

                                {/* Expanded Content */}
                                {expandedContent === content._id && (
                                    <div className={styles.expandedContent}>
                                        <p className={styles.adBody}>{body}</p>
                                        <p className={styles.adCTA}><strong>{cta}</strong></p>
                                        <div className={styles.adMeta}>
                                            <p>{hashtags}</p>
                                            <p>{emojis}</p>
                                        </div>
                                        <p className={styles.adChannel}>
                                            <strong>Channel:</strong> {channel}
                                        </p>
                                        <p className={styles.adCreatedAt}>
                                            <strong>Created At:</strong>{' '}
                                            {new Date(content.createdAt).toLocaleString()}
                                        </p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Pagination Controls */}
            {!loading && !error && totalPages > 1 && (
                <div className={styles.pagination}>
                    <button
                        className={styles.pageButton}
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span className={styles.pageInfo}>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        className={styles.pageButton}
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default PastContentCard;