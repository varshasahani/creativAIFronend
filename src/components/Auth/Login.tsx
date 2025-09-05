import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../services/authService.ts';
import styles from './Auth.module.css';

const Login: React.FC<{ handleLogin: () => void }> = ({ handleLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate(); // Initialize the navigate function

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const payload = { email, password };

        try {
            const response = await loginUser(payload);
            console.log('Login successful:', response);

            // Store tokens or user data in localStorage/sessionStorage if needed
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            localStorage.setItem('userId', response.user._id);

            handleLogin(); // Update authentication state
            navigate('/'); // Redirect to Generate Content page
        } catch (err: any) {
            setError(err.message || 'An error occurred during login.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.authContainer}>
            <form onSubmit={handleSubmit} className={styles.form}>
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
                <button type="submit" className={styles.submitButton} disabled={loading}>
                    {loading ? 'Logging In...' : 'Login'}
                </button>
                {error && <p className={styles.error}>Error: {error}</p>}
            </form>
        </div>
    );
};

export default Login;