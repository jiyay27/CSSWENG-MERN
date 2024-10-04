import React, { useState } from 'react';
import '../styles/login.css'; // Import the CSS file

const Login = () => {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false); // Added loading state
    const [success, setSuccess] = useState(false); // Added success state

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true); // Show loading indicator
        setError(false); // Reset error state
        setSuccess(false); // Reset success state

        const email = event.target.email.value;
        const password = event.target.password.value;

        try {
            // Make a POST request to the backend for login
            const response = await fetch('http://localhost:5000/api/login', { // Ensure correct URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            setLoading(false);

            if (response.ok && data.success) {
                setSuccess(true); // Show success message
                window.location.href = '/dashboard'; // Redirect on success
            } else {
                setError(true); // Show error if login fails
            }
        } catch (err) {
            setLoading(false);
            setError(true); // Handle error in case of network issues
        }
    };

    return (
        <div className="login-container">
            <div className="branding-section">
                <div className="branding-content">
                    <h1>Hello!</h1>
                    <p>Welcome to the Inventory System.</p>
                    <p>Manage your network services, track installations, and monitor infrastructure seamlessly!</p>
                </div>
            </div>

            <div className="form-section">
                <div className="login-form">
                    <h2>Welcome Back!</h2>
                    <p>Log in with your credentials.</p>
                    <form onSubmit={handleSubmit}>
                        <input type="email" name="email" placeholder="Email" required />
                        <input type="password" name="password" placeholder="Password" required />
                        <button type="submit" disabled={loading}>
                            {loading ? 'Logging in...' : 'Login Now'}
                        </button>
                    </form>
                    <a href="#" className="forgot-password">Forgot password? Click here</a>
                </div>
            </div>

            {error && (
                <div className="error-popup active" id="errorPopup">
                    <p>Invalid Email or Password</p>
                    <button onClick={() => setError(false)}>Close</button>
                </div>
            )}

            {success && (
                <div className="success-popup active" id="successPopup">
                    <p>Login successful! Redirecting...</p>
                </div>
            )}
        </div>
    );
};

export default Login;
