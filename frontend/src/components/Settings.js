import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import '../styles/settings.css';

const Settings = () => {
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode');
        return saved !== null ? JSON.parse(saved) : window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    const [currency, setCurrency] = useState(() => {
        const saved = localStorage.getItem('preferredCurrency');
        return saved || 'USD';
    });

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
        if (darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [darkMode]);

    useEffect(() => {
        localStorage.setItem('preferredCurrency', currency);
        // Trigger an event to notify other components of currency change
        window.dispatchEvent(new Event('currencyChange'));
    }, [currency]);

    const handleDarkModeToggle = () => {
        setDarkMode(!darkMode);
    };

    const handleCurrencyChange = (e) => {
        setCurrency(e.target.value);
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
                    <div className="settings-section">
                        <h3>Appearance</h3>
                        <div className="setting-item">
                            <div>
                                <div className="setting-label">
                                    <span>Dark Mode</span>
                                </div>
                                <div className="setting-description">
                                    Switch between light and dark theme
                                </div>
                            </div>
                            <div className="setting-control">
                                <input
                                    type="checkbox"
                                    id="darkModeToggle"
                                    checked={darkMode}
                                    onChange={handleDarkModeToggle}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="settings-section">
                        <h3>Regional</h3>
                        <div className="setting-item">
                            <div>
                                <div className="setting-label">
                                    <span>Currency</span>
                                </div>
                                <div className="setting-description">
                                    Choose your preferred currency display
                                </div>
                            </div>
                            <div className="setting-control">
                                <select 
                                    className="currency-select"
                                    value={currency}
                                    onChange={handleCurrencyChange}
                                >
                                    <option value="USD">USD ($)</option>
                                    <option value="PHP">PHP (₱)</option>
                                    <option value="JPY">JPY (¥)</option>
                                    <option value="EUR">EUR (€)</option>
                                    <option value="GBP">GBP (£)</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Settings;