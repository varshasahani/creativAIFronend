import React, { useState } from 'react';
import useContentRequest from '../../hooks/useContentRequest.ts';
import styles from './GenerateContentCard.module.css';

const GenerateContentCard: React.FC = () => {
    const { loading, error, response, sendContentRequest } = useContentRequest();
    const [formData, setFormData] = useState({
        productName: '',
        tone: '',
        keyBenefits: '',
        targetAudience: '',
        channels: '',
    });

    const toneMap = {
        formal: 'Formal',
        casual: 'Casual',
        professional: 'Professional',
        playful: 'Playful',
        'gen-z': 'Gen-Z',
        millennial: 'Millennial',
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate productName
        if (!formData.productName.trim()) {
            alert('Product Name cannot be empty.');
            return;
        }

        // Validate tone
        if (!formData.tone.trim()) {
            alert('Tone cannot be empty.');
            return;
        }

        // Validate keyBenefits
        const keyBenefitsArray = formData.keyBenefits
            .split(',')
            .map((benefit) => benefit.trim())
            .filter((benefit) => benefit !== '');
        if (keyBenefitsArray.length < 1 || keyBenefitsArray.length > 10) {
            alert('Key Benefits must have between 1 and 10 non-empty items.');
            return;
        }

        // Validate targetAudience
        if (formData.targetAudience.trim().length > 200) {
            alert('Target Audience must not exceed 200 characters.');
            return;
        }

        // Validate channels
        const channelsArray = formData.channels
            .split(',')
            .map((channel) => channel.trim())
            .filter((channel) => channel !== '');
        if (channelsArray.length < 1 || channelsArray.length > 6) {
            alert('You must select between 1 and 6 channels.');
            return;
        }

        const payload = {
            productName: formData.productName,
            tone: formData.tone,
            keyBenefits: keyBenefitsArray,
            targetAudience: formData.targetAudience,
            channels: channelsArray,
        };

        const accessToken = 'your-access-token'; // Replace with actual token
        await sendContentRequest(payload, accessToken);
    };

    return (
        <div className={styles.card}>
            <h2 className={styles.title}>Generate Content</h2>

            <form onSubmit={handleSubmit} className={styles.form}>
                {/* Product Name and Tone */}
                <div className={styles.row}>
                    <div className={styles.formGroup}>
                        <label htmlFor="productName" className={styles.label}>Product Name</label>
                        <input
                            type="text"
                            id="productName"
                            name="productName"
                            placeholder="Enter Product Name"
                            value={formData.productName}
                            onChange={handleChange}
                            className={styles.input}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
    <label htmlFor="tone" className={styles.label}>Tone</label>
    <select
        id="tone"
        name="tone"
        value={formData.tone}
        onChange={handleChange}
        className={styles.input}
        required
    >
        <option value="" disabled>Select a tone</option>
        {Object.entries(toneMap).map(([key, label]) => (
            <option key={key} value={key}>
                {label}
            </option>
        ))}
    </select>
</div>
                </div>

                {/* Key Benefits */}
                <div className={styles.formGroup}>
                    <label htmlFor="keyBenefits" className={styles.label}>
                        Key Benefits <span className={styles.helperText}>(Enter values separated by commas)</span>
                    </label>
                    <input
                        type="text"
                        id="keyBenefits"
                        name="keyBenefits"
                        placeholder="e.g., Hydrating, Lightweight, Long-lasting"
                        value={formData.keyBenefits}
                        onChange={handleChange}
                        className={styles.input}
                        required
                    />
                </div>

                {/* Target Audience */}
                <div className={styles.formGroup}>
                    <label htmlFor="targetAudience" className={styles.label}>Target Audience</label>
                    <input
                        type="text"
                        id="targetAudience"
                        name="targetAudience"
                        placeholder="Describe your target audience (max 200 characters)"
                        value={formData.targetAudience}
                        onChange={handleChange}
                        className={styles.input}
                        maxLength={200}
                        required
                    />
                </div>

                {/* Channels */}
                <div className={styles.formGroup}>
                    <label htmlFor="channels" className={styles.label}>
                        Channels <span className={styles.helperText}>(Enter values separated by commas)</span>
                    </label>
                    <input
                        type="text"
                        id="channels"
                        name="channels"
                        placeholder="e.g., Instagram, Facebook, Google Ads"
                        value={formData.channels}
                        onChange={handleChange}
                        className={styles.input}
                        required
                    />
                </div>

                {/* Submit Button */}
                <button type="submit" className={styles.submitButton} disabled={loading}>
                    {loading ? 'Generating...' : 'Generate Content'}
                </button>
            </form>

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