import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/dashboard.css';
import '../styles/sidebar.css';
import Sidebar from './Sidebar';
import DoughnutChart from './DoughnutChart';

const Dashboard = () => {
    const [openProfile, setOpenProfile] = useState(false);
    return (
        <div className="container">
            <Sidebar />
            <div className="main-content">
                <header>
                    <div className="header-content">
                        <input type="text" placeholder="Search..." />
                        <div className="user-profile">
                            <span className="emoji" onClick={()=> setOpenProfile((prev)=> !prev)}>😊</span><span>Username</span>
                            {
                                openProfile && 
                                <ul class="user-menu">
                                    <li><a href=''>Profile</a></li>
                                    <li><a href='/'>Log Out</a></li>
                                </ul>
                            }
                        </div>
                    </div>
                </header>
                <div className="cards">
                    <div className="card total-inventory">
                        <h3><span className="icon">📦</span>Total Inventory</h3>
                        <p>1000 Items</p>
                        <Link to="/inventory">
                            <button>View Details</button>
                        </Link>
                    </div>
                    <div className="card low-stock">
                        <h3><span className="icon">⚠️</span>Low Stock Alerts</h3>
                        <p>5 Items</p>
                        <Link to="/reports/inventory">
                            <button>View Alerts</button>
                        </Link>
                    </div>
                    <div className="card recent-activities">
                        <h3><span className="icon">📝</span>Recent Activities</h3>
                        <ul>
                            <li>Item A added.</li>
                            <li>Item B updated.</li>
                            <li>Order #123 completed.</li>
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