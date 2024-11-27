import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import '../styles/settings.css';

const Settings = () => {
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode');
        // Apply dark mode on initial load
        if (saved) {
            document.body.classList.toggle('dark-mode', JSON.parse(saved));
        }
        return saved ? JSON.parse(saved) : false;
    });

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
        document.body.classList.toggle('dark-mode', darkMode);
    }, [darkMode]);

    const handleDarkModeToggle = () => {
        setDarkMode(!darkMode);
    };

    return (
        <div className="container">
            <Sidebar />
            <div className="main-content">
                <header>
                    <div className="header-content">
                        <h2>Settings</h2>
                    </div>
                </header>
                <div className="settings-content">
                    <div className="setting-item">
                        <label htmlFor="darkModeToggle">Dark Mode</label>
                        <input
                            type="checkbox"
                            id="darkModeToggle"
                            checked={darkMode}
                            onChange={handleDarkModeToggle}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;