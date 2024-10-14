import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/sidebar.css';

const Sidebar = () => {
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(true);

    const toggleSidebar = () => {
        setSidebarCollapsed(!isSidebarCollapsed);
    };

    const handleMenuToggle = (event) => {
        const parentLi = event.currentTarget.parentElement;
        parentLi.classList.toggle('active');
    };

    return (
        <nav className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
            <div className="brand">
                <img src="/logo.jpg" alt="Brand Logo" className="logo" />
                <div className="hamburger" onClick={toggleSidebar}>
                    &#9776;
                </div>
            </div>
            <ul className="menu">
                <li>
                    <Link to="/dashboard">
                        <span className="icon">🏠</span>
                        <span className="text">Dashboard</span>
                    </Link>
                </li>
                <li>
                    <a href="#" className="dropdown-toggle" onClick={handleMenuToggle}>
                        <span className="icon">📦</span>
                        <span className="text">Inventory</span>
                        <span className="arrow">▼</span>
                    </a>
                    <ul className="submenu">
                        <li><a href="#" onClick={() => alert('Open Add Item Modal')}>Add Item</a></li>
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
                    <Link to="/settings">
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
            </ul>
        </nav>
    );
};

export default Sidebar;
