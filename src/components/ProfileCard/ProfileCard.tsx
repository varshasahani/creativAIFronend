import React, { useEffect, useState } from 'react';
import styles from './ProfileCard.module.css';
import { getProfile, updateProfile } from '../../services/authService.ts';
import MultiSelect from '../common/MultiSelect.tsx';

const languageMap = {
    en: 'English',
    es: 'Spanish',
    fr: 'French',
    hindi: 'Hindi',
};

const toneMap = {
    formal: 'Formal',
    casual: 'Casual',
    professional: 'Professional',
    playful: 'Playful',
    'gen-z': 'Gen-Z',
    millennial: 'Millennial',
};

const productTypeMap = {
    clothes: 'Clothes',
    beauty: 'Beauty',
    medicine: 'Medicine',
    supplements: 'Supplements',
};

const channelOptions = ['Instagram', 'Facebook', 'Twitter', 'LinkedIn', 'YouTube'];

const ProfileCard: React.FC = () => {
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedProfile, setEditedProfile] = useState<any>({});

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            setError(null);
            try {
                let accessToken = localStorage.getItem('accessToken');
                if (!accessToken) {
                    throw new Error('Access token is missing. Please log in again.');
                }
        
                try {
                    const data = await getProfile(accessToken);
                    setProfile(data);
                    setEditedProfile(data);
                } catch (err: any) {
                    if (err.response?.status === 401) {
                        // Token expired, try refreshing it
                        accessToken = await refreshAccessToken();
                        const data = await getProfile(accessToken);
                        setProfile(data);
                        setEditedProfile(data);
                    } else {
                        throw err;
                    }
                }
            } catch (err: any) {
                setError(err.message || 'An error occurred while fetching the profile.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
    
        // Handle nested fields like "preferences.defaultTone"
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setEditedProfile((prev: any) => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value,
                },
            }));
        } else {
            setEditedProfile((prev: any) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleChannelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const options = Array.from(e.target.selectedOptions, (option) => option.value);
        setEditedProfile((prev: any) => ({
            ...prev,
            preferences: {
                ...prev.preferences,
                preferredChannels: options,
            },
        }));
    };

    const sanitizeProfilePayload = (profile: any) => {
        const { _id, createdAt, updatedAt, isOnboarded, isActive, lastLoginAt, totalContentRequests, ...sanitized } = profile;
    
        // Ensure preferences remain nested
        sanitized.preferences = {
            defaultLanguage: profile.preferences.defaultLanguage,
            defaultTone: profile.preferences.defaultTone,
            preferredChannels: profile.preferences.preferredChannels,
            defaultProductType: profile.preferences.defaultProductType,
        };
    
        return sanitized;
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            const accessToken = localStorage.getItem('accessToken');
            if (!accessToken) {
                throw new Error('Access token is missing. Please log in again.');
            }

            const sanitizedProfile = sanitizeProfilePayload(editedProfile);
            const updatedData = await updateProfile(accessToken, sanitizedProfile);
            setProfile(updatedData);
            setIsEditing(false);
        } catch (err: any) {
            setError(err.message || 'An error occurred while updating the profile.');
        } finally {
            setLoading(false);
        }
    };

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
                    <div className={styles.section}>
                        {/* Name */}
                        <label className={styles.field}>
                            <strong>Name:</strong>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="name"
                                    value={editedProfile.name}
                                    onChange={handleInputChange}
                                    className={styles.input}
                                />
                            ) : (
                                <span>{profile.name}</span>
                            )}
                        </label>

                        {/* Email */}
                        <label className={styles.field}>
                            <strong>Email:</strong>
                            {isEditing ? (
                                <input
                                    type="email"
                                    name="email"
                                    value={editedProfile.email}
                                    onChange={handleInputChange}
                                    className={styles.input}
                                />
                            ) : (
                                <span>{profile.email}</span>
                            )}
                        </label>

                        {/* Phone */}
                        <label className={styles.field}>
                            <strong>Phone:</strong>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="phone"
                                    value={editedProfile.phone}
                                    onChange={handleInputChange}
                                    className={styles.input}
                                />
                            ) : (
                                <span>{profile.phone}</span>
                            )}
                        </label>

                        {/* Company */}
                        <label className={styles.field}>
                            <strong>Company:</strong>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="company"
                                    value={editedProfile.company}
                                    onChange={handleInputChange}
                                    className={styles.input}
                                />
                            ) : (
                                <span>{profile.company}</span>
                            )}
                        </label>

                        {/* Preferences */}
                        <h3 className={styles.sectionTitle}>Preferences</h3>

                        {/* Default Tone */}
                        <label className={styles.field}>
                            <strong>Tone:</strong>
                            {isEditing ? (
                                <select
                                    name="preferences.defaultTone"
                                    value={editedProfile.preferences.defaultTone}
                                    onChange={handleInputChange}
                                    className={styles.input}
                                >
                                    {Object.entries(toneMap).map(([key, label]) => (
                                        <option key={key} value={key}>
                                            {label}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <span>{toneMap[profile.preferences.defaultTone]}</span>
                            )}
                        </label>

                        {/* Default Language */}
                        <label className={styles.field}>
                            <strong>Language:</strong>
                            {isEditing ? (
                                <select
                                    name="preferences.defaultLanguage"
                                    value={editedProfile.preferences.defaultLanguage}
                                    onChange={handleInputChange}
                                    className={styles.input}
                                >
                                    {Object.entries(languageMap).map(([key, label]) => (
                                        <option key={key} value={key}>
                                            {label}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <span>{languageMap[profile.preferences.defaultLanguage]}</span>
                            )}
                        </label>

                        {/* Default Product Type */}
                        <label className={styles.field}>
                            <strong>Product Type:</strong>
                            {isEditing ? (
                                <select
                                    name="preferences.defaultProductType"
                                    value={editedProfile.preferences.defaultProductType}
                                    onChange={handleInputChange}
                                    className={styles.input}
                                >
                                    {Object.entries(productTypeMap).map(([key, label]) => (
                                        <option key={key} value={key}>
                                            {label}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <span>{productTypeMap[profile.preferences.defaultProductType]}</span>
                            )}
                        </label>

                        {/* Preferred Channels */}
                        <label className={styles.field}>
    <strong>Preferred Channels:</strong>
    {isEditing ? (
        <MultiSelect
            options={channelOptions}
            selectedOptions={editedProfile.preferences.preferredChannels}
            onChange={(selected) =>
                setEditedProfile((prev: any) => ({
                    ...prev,
                    preferences: {
                        ...prev.preferences,
                        preferredChannels: selected,
                    },
                }))
            }
            placeholder="Select preferred channels"
        />
    ) : (
        <span>{profile.preferences.preferredChannels.join(', ')}</span>
    )}
</label>
                    </div>

                    <div className={styles.actions}>
                        {isEditing ? (
                            <>
                                <button onClick={handleSave} className={styles.saveButton}>Save</button>
                                <button onClick={() => setIsEditing(false)} className={styles.cancelButton}>Cancel</button>
                            </>
                        ) : (
                            <button onClick={() => setIsEditing(true)} className={styles.editButton}>Edit</button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default ProfileCard;