import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/dashboard.css';
import '../styles/sidebar.css';
import Sidebar from './Sidebar';
import DoughnutChart from './DoughnutChart';
import config from '../config';

const Dashboard = () => {
    const [openProfile, setOpenProfile] = useState(false);
    const [recentActivities, setRecentActivities] = useState([]);
    const [lowStockCount, setLowStockCount] = useState(0);
    const [inventoryCount, setInventoryCount] = useState(0);

    useEffect(() => {
        // Fetch recent activities
        const fetchRecentActivities = async () => {
            try {
                const response = await fetch(`${config.API_URL}/api/transactions`);
                const data = await response.json();
                console.log('Received transactions:', data);
                if (data.transactions) {
                    setRecentActivities(data.transactions);
                }
            } catch (error) {
                console.error('Error fetching recent activities:', error);
            }
        };

        // Fetch inventory stats
        const fetchInventoryStats = async () => {
            try {
                const response = await fetch(`${config.API_URL}/api/items`);
                const items = await response.json();
                
                // Count total items
                setInventoryCount(items.length);
                
                // Count items with low or no stock
                const lowStockItems = items.filter(item => 
                    item.status === 'Low Stock' || item.status === 'Out of Stock'
                );
                setLowStockCount(lowStockItems.length);
            } catch (error) {
                console.error('Error fetching inventory stats:', error);
            }
        };

        fetchRecentActivities();
        fetchInventoryStats();
    }, []);

    // Add click outside handler
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (openProfile && !event.target.closest('.user-profile')) {
                setOpenProfile(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [openProfile]);

    return (
        <div className="container">
            <Sidebar />
            <div className="main-content">
            <header>
                <div className="header-content">
                    <div className="user-profile" onClick={() => setOpenProfile(!openProfile)}>
                        <span className="emoji">😊</span>
                        <span>Username</span>
                        {openProfile && (
                            <ul className="user-menu">
                                <li><a href="#">Profile</a></li>
                                <li><a href="/">Log Out</a></li>
                            </ul>
                        )}
                    </div>
                </div>
            </header>
                <div className="cards">
                    <div className="card total-inventory">
                        <h3><span className="icon">📦</span>Total Inventory</h3>
                        <p>{inventoryCount} Items</p>
                        <Link to="/inventory">
                            <button>View Details</button>
                        </Link>
                    </div>
                    <div className="card low-stock">
                        <h3><span className="icon">⚠️</span>Low Stock Alerts</h3>
                        <p>{lowStockCount} Items</p>
                        <Link to="/reports/inventory">
                            <button>View Alerts</button>
                        </Link>
                    </div>
                    <div className="card recent-activities">
                        <h3><span className="icon">📝</span>Recent Activities</h3> 
                        <ul>
                            {console.log('Current recentActivities:', recentActivities)}
                            {recentActivities.length > 0 ? (
                                recentActivities.map((activity, index) => (
                                    <li key={activity._id || index}>
                                        <div className="activity-item">
                                            <span className="activity-type">{activity.type}</span>
                                            <span className="activity-description">{activity.description}</span>
                                            <span className="activity-time">
                                                {new Date(activity.timestamp).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <li>No recent activities</li>
                            )}
                        </ul>
                        <button>See More</button>
                    </div>
                    <div className="card trends">
                        <h3><span className="icon">📊</span>Inventory Stock</h3>
                        <DoughnutChart />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;