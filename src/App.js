import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar.tsx';
import GenerateContentCard from './components/GenerateContentCard/GenerateContentCard.tsx';
import AnalyticsCard from './components/AnalyticsCard/AnalyticsCard.tsx';
import PastContentCard from './components/PastContentCard/PastContentCard.tsx';
import ProfileCard from './components/ProfileCard/ProfileCard.tsx';
import SettingsCard from './components/SettingsCard/SettingsCard.tsx';
import Login from './components/Auth/Login.tsx';
import SignUp from './components/Auth/SignUp.tsx';
import './App.css';
import { loginUser } from './services/authService.ts';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('accessToken')); // Authentication state
    const [activeComponent, setActiveComponent] = useState('generateContent'); // Active component state
    const [authMode, setAuthMode] = useState('login'); // 'login' or 'signup'

    useEffect(() => {
        // Check if tokens exist in localStorage
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = async (credentials: { email: string; password: string }) => {
        try {
            const { userId, accessToken, refreshToken } = await loginUser(credentials);
    
            // Store tokens and userId in localStorage
            localStorage.setItem('userId', userId);
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
    
            // Update authentication state
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const handleLogout = () => {
        localStorage.clear();
        setIsAuthenticated(false); // Simulate logout
        setActiveComponent('generateContent'); // Reset active component
    };

    const renderComponent = () => {
        switch (activeComponent) {
            case 'generateContent':
                return <GenerateContentCard />;
            case 'analytics':
                return <AnalyticsCard />;
            case 'pastContent':
                return <PastContentCard />;
            case 'profile':
                return <ProfileCard />;
            case 'settings':
                return <SettingsCard />;
            default:
                return <GenerateContentCard />;
        }
    };

    return (
        <Router>
            <div className="app-container">
                <Routes>
                    {/* Unauthenticated Routes */}
                    {!isAuthenticated && (
                        <>
                            <Route
                                path="/"
                                element={
                                    <div className="auth-container">
                                        {authMode === 'login' ? (
                                            <Login handleLogin={handleLogin} />
                                        ) : (
                                            <SignUp setIsAuthenticated={setIsAuthenticated}/>
                                        )}
                                        <button
                                            className="auth-toggle"
                                            onClick={() =>
                                                setAuthMode(authMode === 'login' ? 'signup' : 'login')
                                            }
                                        >
                                            {authMode === 'login' ? "Don't have an account" : 'already have an account'}? Click here to {authMode === 'login' ? 'Sign Up' : 'Log In'}
                                        </button>
                                    </div>
                                }
                            />
                            <Route path="*" element={<Navigate to="/" />} />
                        </>
                    )}

                    {/* Authenticated Routes */}
                    {isAuthenticated && (
                        <>
                            <Route
                                path="/"
                                element={
                                    <>
                                        <Sidebar
                                            setActiveComponent={setActiveComponent}
                                            handleLogout={handleLogout} // Pass handleLogout to Sidebar
                                        />
                                        <div className="content">
                                            {renderComponent()}
                                        </div>
                                    </>
                                }
                            />
                            <Route path="/generateContent" element={<GenerateContentCard />} />
                            <Route path="*" element={<Navigate to="/" />} />
                        </>
                    )}
                </Routes>
            </div>
        </Router>
    );
};

export default App;