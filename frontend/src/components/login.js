import React, { useState } from 'react';
import '../styles/login.css'; // Import the CSS file

const Login = () => {
    const [error, setError] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;

        if (email === 'john@john.com' && password === '1234') {
            window.location.href = '/dashboard';
        } else {
            setError(true);
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
                        <button type="submit">Login Now</button>
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
        </div>
    );
};

export default Login;