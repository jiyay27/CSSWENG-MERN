// src/components/ForgotPassword.js

import React, { useState } from 'react';
import '../styles/forgot-password.css';

const ForgotPassword = () => {
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email || !password) {
            setError(true);
            return;
        }

        try {
            // Make a POST request to the backend for password reset
            const response = await fetch('http://localhost:5000/api/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                setSuccess(true);
                console.log('Password updated successfully');
            } else {
                setError(true);
                console.error('Failed to update password');
            }
        } catch (err) {
            setError(true);
            console.error('Error updating password:', err);
        }
    };

    return (
        <div className="forgot-password-container">
            <h2>Reset Password</h2>
            {error && <div className="error-popup">Invalid email or password</div>}
            {success && <div className="success-popup">Password updated successfully!</div>}
```
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
                <button type="submit" disabled={false}>Reset Password</button>
            </form>
        </div>
    );
};

export default ForgotPassword;
