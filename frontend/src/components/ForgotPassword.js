// src/components/ForgotPassword.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/forgot-password.css';
import config from '../config';

const ForgotPassword = () => {
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(false);
        setSuccess(false);
        setErrorMessage('');

        // Basic validation
        if (!email || !password) {
            setError(true);
            setErrorMessage('Please fill in all fields');
            setLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setError(true);
            setErrorMessage('Passwords do not match');
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setError(true);
            setErrorMessage('Password must be at least 6 characters long');
            setLoading(false);
            return;
        }

        try {
            console.log('Attempting password reset for:', email);
            const response = await fetch(`${config.API_URL}/api/login/reset-password`, { // Updated endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            
            console.log('Response status:', response.status);
            const data = await response.json();
            console.log('Response data:', data);

            if (response.ok) {
                setSuccess(true);
                setTimeout(() => {
                    navigate('/'); // Redirect to login page after 2 seconds
                }, 2000);
            } else {
                setError(true);
                setErrorMessage(data.message || 'Failed to reset password');
            }
        } catch (err) {
            console.error('Reset password error:', err);
            setError(true);
            setErrorMessage('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="forgot-password-container">
            <div className="branding-section">
                <div className="branding-content">
                    <h1>Password Reset</h1>
                    <p>Reset your password to regain access to your account.</p>
                </div>
            </div>
            
            <div className="form-section">
                <div className="forgot-password-form">
                    <h2>Reset Password</h2>
                    <p>Enter your email and new password below.</p>
                    
                    <form onSubmit={handleSubmit}>
                        <input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="Email"
                            required
                        />
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            placeholder="New Password"
                            required
                        />
                        <input 
                            type="password" 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            placeholder="Confirm New Password"
                            required
                        />
                        <button type="submit" disabled={loading}>
                            {loading ? 'Resetting...' : 'Reset Password'}
                        </button>
                        <button 
                            type="button" 
                            onClick={() => navigate('/')}
                            className="back-button"
                        >
                            Back to Login
                        </button>
                    </form>
                </div>
            </div>

            {error && (
                <div className="error-popup active">
                    <p>{errorMessage}</p>
                    <button onClick={() => setError(false)}>Close</button>
                </div>
            )}

            {success && (
                <div className="success-popup active">
                    <p>Password reset successful! Redirecting to login...</p>
                </div>
            )}
        </div>
    );
};

export default ForgotPassword;
