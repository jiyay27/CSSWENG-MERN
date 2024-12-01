import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/sidebar.css';

const Sidebar = () => {
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(true);

    const toggleSidebar = () => {
        setSidebarCollapsed(!isSidebarCollapsed);
        // Remove 'active' class from all menu items when collapsing
        if (!isSidebarCollapsed) {
            const activeItems = document.querySelectorAll('.menu li.active');
            activeItems.forEach(item => item.classList.remove('active'));
        }
    };

    const handleMenuToggle = (event) => {
        const parentLi = event.currentTarget.parentElement;
        parentLi.classList.toggle('active');
    
        if (isSidebarCollapsed) {
            setSidebarCollapsed(false);
        }
    };

    return (
        <nav className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
            <div className="brand">
                <img 
                    src={process.env.PUBLIC_URL + '/innovasian-icon.jpg'}
                    className="logo"
                />
                <div className="hamburger" onClick={toggleSidebar}>
                    &#9776;
                </div>
            </div>
            <ul className="menu">
                <li>
                    <Link to="/dashboard" title="Dashboard">
                        <span className="icon">🏠</span>
                        <span className="text">Dashboard</span>
                    </Link>
                </li>
                <li>
                    <a href="#" className="dropdown-toggle" onClick={handleMenuToggle} title="Inventory">
                        <span className="icon">📦</span>
                        <span className="text">Inventory</span>
                        <span className="arrow">▶</span>
                    </a>
                    <ul className="submenu">
                        <Link to="/inventory">View Items</Link>
                        <Link to="/categories">Categories</Link>
                    </ul>
                </li>
                <li>
                    <a href="#" className="dropdown-toggle" onClick={handleMenuToggle}>
                        <span className="icon">🛒</span>
                        <span className="text">Orders</span>
                        <span className="arrow">▼</span>
                    </a>
                    <ul className="submenu">
                        <Link to="/orders/view">View Orders</Link>
                        <Link to="/orders/pending">Pending Orders</Link>
                    </ul>
                </li>
                <li>
                    <a href="#" className="dropdown-toggle" onClick={handleMenuToggle}>
                        <span className="icon">📊</span>
                        <span className="text">Reports</span>
                        <span className="arrow">▼</span>
                    </a>
                    <ul className="submenu">
                        <Link to="/reports/sales">Sales Reports</Link>
                        <Link to="/reports/inventory">Inventory Reports</Link>
                    </ul>
                </li>
                <li>
                    <Link to="/settings" title="Settings">
                        <span className="icon">⚙️</span>
                        <span className="text">Settings</span>
                    </Link>
                </li>
                <li>
                    <a href="#">
                        <span className="icon">❓</span>
                        <span className="text">Help/Support</span>
                    </a>
                </li>
                <li className="logout-item">
                    <Link to="/" title="Logout">
                        <span className="icon">🚪</span>
                        <span className="text">Logout</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Sidebar;
