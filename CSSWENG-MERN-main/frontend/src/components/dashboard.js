import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/dashboard.css';
import '../styles/sidebar.css';

const Dashboard = () => {
    const handleMenuToggle = (event) => {
        const parentLi = event.currentTarget.parentElement;
        parentLi.classList.toggle('active');
    };

    const handleHamburgerToggle = () => {
        document.querySelector('.sidebar').classList.toggle('collapsed');
    };

    return (
        <div className="container">
            <nav className="sidebar collapsed">
                <div className="brand">
                    <img src="logo.jpg" alt="Brand Logo" className="logo" />
                    <div className="hamburger" id="hamburger" onClick={handleHamburgerToggle}>
                        &#9776;
                    </div>
                </div>
                <ul className="menu">
                    <li>
                        <a href="#" className="active"><span className="icon">🏠</span><span className="text">Dashboard</span></a>
                    </li>
                    <li>
                        <a href="#" className="dropdown-toggle" onClick={handleMenuToggle}>
                            <span className="icon">📦</span><span className="text">Inventory</span><span className="arrow">▼</span>
                        </a>
                        <ul className="submenu">
                            <li><a href="#">Add Item</a></li>
                            <Link to="/inventory">View Items</Link>
                            <li><a href="#">Categories</a></li>
                        </ul>
                    </li>
                    {/* Additional menu items */}
                </ul>
            </nav>
            
            <div className="main-content">
                <header>
                    <div className="header-content">
                        <input type="text" placeholder="Search..." />
                        <div className="user-profile">
                            <span className="emoji">😊</span><span>Username</span>
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
                        <button>View Alerts</button>
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
                        <h3><span className="icon">📊</span>Graphical Trends</h3>
                        <p>Graph will go here.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;