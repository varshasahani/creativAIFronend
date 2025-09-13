import React, { useState } from 'react';
import useContentRequest from '../../hooks/useContentRequest.ts';
import styles from './GenerateContentCard.module.css';
import MultiSelect from '../common/MultiSelect.tsx';
import { ALLOWED_CHANNELS } from '../../constants.ts';
const GenerateContentCard: React.FC = () => {
     const [preferredChannels, setpreferredChannels] = useState<string[]>([]);
    let { loading, error, response, sendContentRequest } = useContentRequest();
  
    const [formData, setFormData] = useState({
        productName: '',
        tone: '',
        keyBenefits: '',
        targetAudience: '',
        channels: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false); // State for form submission loader

    const toneMap = {
        formal: 'Formal',
        casual: 'Casual',
        professional: 'Professional',
        playful: 'Playful',
        'gen-z': 'Gen-Z',
        millennial: 'Millennial',
    };

    const availablepreferredChannels = ALLOWED_CHANNELS

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleChannelChange = (selectedOptions: any) => {
        // Ensure selectedOptions is an array
        const selectedValues = Array.isArray(selectedOptions)
            ? selectedOptions
            : [selectedOptions];
    
        setpreferredChannels(selectedValues); // Update preferredChannels state
        setFormData((prev) => ({
            ...prev,
            channels: selectedValues.join(', '), // Update formData.channels as a comma-separated string
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
       const channelsArray = preferredChannels; // Use preferredChannels directly
       if (channelsArray.length < 1) {
           alert('You must select at least 1 channel.');
           return;
       }
        const userId=localStorage.getItem('userId');
        if(!userId){
            alert('User ID is missing. Please log in again.');
            return;
        }
        const payload = {
            userId: userId,
            productName: formData.productName,
            tone: formData.tone,
            keyBenefits: keyBenefitsArray,
            targetAudience: formData.targetAudience,
            channels: channelsArray,
        };

        try {
            setIsSubmitting(true); // Show loader during submission
            await sendContentRequest(payload);
        } catch (err) {
            console.error('Error generating content:', err);
        } finally {
            setIsSubmitting(false); // Hide loader after submission
        }
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
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                <label htmlFor="preferredChannels" className={styles.label}>
        Preferred Channels
        <span className={styles.helperText}>(select only 1 for better performance)</span>
    </label>
    <MultiSelect
        options={availablepreferredChannels}
        selectedOptions={preferredChannels}
        onChange={setpreferredChannels}
        placeholder="Select preferred channels"
    />
</div>

                {/* Submit Button */}
                <button type="submit" className={styles.submitButton} disabled={loading}>
                    {loading ? 'Generating...' : 'Generate Content'}
                </button>
            </form>

            <div className={styles.generatedAds}>
                {error && <p className={styles.error}>Error: {error}</p>}
                {response && response.channelContents.map((ad: any, index: number) => (
                    <div key={index} className={styles.adCard}>
                        <div className={styles.channelTag}>{ad.content.channel}</div>
                        <h3 className={styles.adTitle}>{ad.content.title}</h3>
                        <p className={styles.adBody}>{ad.content.body}</p>
                        <p className={styles.adCTA}><strong>{ad.content.cta}</strong></p>
                        <div className={styles.adMeta}>
                            <p>{ad.content.meta.hashtags.join(' ')}</p>
                            <p>{ad.content.meta.emojis.join(' ')}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GenerateContentCard;