import React, { useState } from 'react';
import useContentRequest from '../../hooks/useContentRequest.ts';
import styles from './GenerateContentCard.module.css';

const GenerateContentCard: React.FC = () => {
    const { loading, error, response, sendContentRequest } = useContentRequest();
    const [formData, setFormData] = useState({
        campaignName: '',
        brandWork: '',
        areaOfFocus: '',
        location: '',
        channels: [''],
        userPrompt: '', // This will act as the description
        tone: '',
        language: 'en',
        productType: '',
        aiProvider: 'openai',
        aiModel: 'gpt-4o',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const accessToken = 'your-access-token'; // Replace with actual token
        await sendContentRequest(formData, accessToken);
    };

    return (
        <div className={styles.card}>
            <h2 className={styles.title}>Create Content Form</h2>

            {/* Interactive Form */}
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    name="campaignName"
                    placeholder="Campaign Name"
                    value={formData.campaignName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="brandWork"
                    placeholder="Brand Work"
                    value={formData.brandWork}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="areaOfFocus"
                    placeholder="Area of Focus"
                    value={formData.areaOfFocus}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                />
                <select name="tone" value={formData.tone} onChange={handleChange} required>
                    <option value="">Select Tone</option>
                    <option value="casual">Casual</option>
                    <option value="formal">Formal</option>
                </select>
                <input
                    type="text"
                    name="productType"
                    placeholder="Product Type"
                    value={formData.productType}
                    onChange={handleChange}
                    required
                />

                {/* User Prompt (Description) */}
                <textarea
                    name="userPrompt"
                    placeholder="Content Description"
                    value={formData.userPrompt}
                    onChange={handleChange}
                    className={styles.textarea}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? 'Generating...' : 'Generate Content'}
                </button>
            </form>

            {/* Result Section */}
            <div className={styles.result}>
                {error && <p className={styles.error}>Error: {error}</p>}
                {response && (
                    <div className={styles.response}>
                        <h3>Generated Content:</h3>
                        <p>{response.generatedContent}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GenerateContentCard;