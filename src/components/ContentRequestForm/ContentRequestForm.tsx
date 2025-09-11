import React, { useState } from 'react';
import useContentRequest from '../../hooks/useContentRequest.ts';
import styles from './ContentRequestForm.module.css';

const ContentRequestForm: React.FC = () => {
    const { loading, error, response, sendContentRequest } = useContentRequest();
    const [formData, setFormData] = useState({
        userId: '',
        campaignName: '',
        brandWork: '',
        areaOfFocus: '',
        location: '',
        channels: [''],
        userPrompt: '',
        tone: '',
        language: 'en',
        productType: '',
        aiProvider: 'openai',
        aiModel: 'gpt-4o',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const accessToken = 'your-access-token'; // Replace with actual token
        await sendContentRequest(formData);
    };

    return (
        <div className={styles.container}>
            <h2>Create Content Request</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    name="userId"
                    placeholder="User ID"
                    value={formData.userId}
                    onChange={handleChange}
                    required
                />
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
                <input
                    type="text"
                    name="userPrompt"
                    placeholder="User Prompt"
                    value={formData.userPrompt}
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
                <button type="submit" disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit'}
                </button>
            </form>
            {error && <p className={styles.error}>Error: {error}</p>}
            {response && <p className={styles.success}>Success: {JSON.stringify(response)}</p>}
        </div>
    );
};

export default ContentRequestForm;