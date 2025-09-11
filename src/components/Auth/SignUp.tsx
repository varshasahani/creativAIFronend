import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, loginUser } from '../../services/authService.ts';
import styles from './Auth.module.css';
import MultiSelect from '../common/MultiSelect.tsx';

const SignUp: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [company, setCompany] = useState('');
    const [phone, setPhone] = useState('');
    const [defaultTone, setDefaultTone] = useState('Casual');
    const [defaultLanguage, setDefaultLanguage] = useState('English');
    const [preferredChannels, setpreferredChannels] = useState<string[]>(['Instagram', 'Facebook']);
    const [defaultProductType, setDefaultProductType] = useState('Beauty');
    const [brandDescription, setBrandDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false); // State to toggle dropdown visibility

    const navigate = useNavigate();
    const dropdownRef = useRef<HTMLDivElement>(null); // Ref for the dropdown container

    // List of available preferredChannels
    const availablepreferredChannels = [
        'Instagram',
        'Facebook',
        'Google Ads',
        'Meta Ads',
        'LinkedIn',
        'WhatsApp',
        'TikTok',
        'Email',
        'SMS',
    ];

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (loading) return;

        setLoading(true);
        setError(null);
        setSuccess(false);

        const payload = {
            name,
            email,
            password,
            company,
            phone,
            preferences: {
                defaultTone,
                defaultLanguage,
                preferredChannels,
                defaultProductType,
            },
            brandDescription,
        };

        try {
            await registerUser(payload);
            setSuccess(true);

            const loginPayload = { email, password };
            const response = await loginUser(loginPayload);

            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            localStorage.setItem('userId', response.user?._id);

            navigate('/');
        } catch (err: any) {
            setError(err.message || 'An error occurred during registration.');
        } finally {
            setLoading(false);
        }
    };

    const toggleChannel = (channel: string) => {
        if (preferredChannels.includes(channel)) {
            setpreferredChannels(preferredChannels.filter((c) => c !== channel));
        } else {
            setpreferredChannels([...preferredChannels, channel]);
        }
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.authContainer}>
            <h2 className={styles.title}>Sign Up</h2>
            <form onSubmit={handleSignUp} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}>Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={styles.input}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.input}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password" className={styles.label}>Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.input}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="company" className={styles.label}>Company</label>
                    <input
                        type="text"
                        id="company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className={styles.input}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="phone" className={styles.label}>Phone</label>
                    <input
                        type="text"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={styles.input}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="tone" className={styles.label}>Tone</label>
                    <input
                        type="text"
                        id="tone"
                        value={defaultTone}
                        onChange={(e) => setDefaultTone(e.target.value)}
                        className={styles.input}
                        placeholder="Enter tone (e.g., casual, formal)"
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="language" className={styles.label}>Language</label>
                    <input
                        type="text"
                        id="language"
                        value={defaultLanguage}
                        onChange={(e) => setDefaultLanguage(e.target.value)}
                        className={styles.input}
                        placeholder="Enter language (e.g., English, Spanish)"
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="productType" className={styles.label}>Product Type</label>
                    <input
                        type="text"
                        id="productType"
                        value={defaultProductType}
                        onChange={(e) => setDefaultProductType(e.target.value)}
                        className={styles.input}
                        required
                    />
                </div>
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
    <MultiSelect
        label="Preferred Channels"
        options={availablepreferredChannels}
        selectedOptions={preferredChannels}
        onChange={setpreferredChannels}
        placeholder="Select preferred channels"
    />
</div>
                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <label htmlFor="brandDescription" className={styles.label}>Brand Description</label>
                    <textarea
                        id="brandDescription"
                        value={brandDescription}
                        onChange={(e) =>
                            setBrandDescription(e.target.value.slice(0, 250))
                        }
                        className={styles.textarea}
                        placeholder="Describe your brand (max 250 characters)"
                        required
                    />
                    <p className={styles.charCount}>{brandDescription.length}/250</p>
                </div>
                <button type="submit" className={styles.submitButton} disabled={loading}>
                    {loading ? 'Signing Up...' : 'Sign Up'}
                </button>
                {error && <p className={styles.error}>Error: {error}</p>}
                {success && <p className={styles.success}>Registration successful!</p>}
            </form>
        </div>
    );
};

export default React.memo(SignUp);