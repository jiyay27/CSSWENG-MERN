import React, { useState } from 'react';
import '../styles/inventory.css';
import '../styles/modal.css';

const Inventory = () => {
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);

    const toggleSidebar = () => setSidebarCollapsed(!isSidebarCollapsed);

    const toggleModal = () => setModalOpen(!isModalOpen);

    return (
        <div className="container">
            {/* Sidebar */}
            <nav className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
                <div className="brand">
                    <img src="logo.jpg" alt="Brand Logo" className="logo" />
                    <div className="hamburger" onClick={toggleSidebar}>
                        &#9776;
                    </div>
                </div>
                <ul className="menu">
                    <li>
                        <a href="/dashboard">
                            <span className="icon">🏠</span>
                            <span className="text">Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="#" className="active dropdown-toggle">
                            <span className="icon">📦</span>
                            <span className="text">Inventory</span>
                            <span className="arrow">▼</span>
                        </a>
                        <ul className="submenu">
                            <li><a href="#" onClick={toggleModal}>Add Item</a></li>
                            <li><a href="/inventory">View Items</a></li>
                            <li><a href="/categories">Categories</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">
                            <span className="icon">🛒</span>
                            <span className="text">Orders</span>
                            <span className="arrow">▼</span>
                        </a>
                        <ul className="submenu">
                            <li><a href="#">View Orders</a></li>
                            <li><a href="#">Pending Orders</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="#">
                            <span className="icon">📊</span>
                            <span className="text">Reports</span>
                            <span className="arrow">▼</span>
                        </a>
                        <ul className="submenu">
                            <li><a href="#">Sales Reports</a></li>
                            <li><a href="#">Inventory Reports</a></li>
                        </ul>
                    </li>
                    <li>
                        <a href="/settings">
                            <span className="icon">⚙️</span>
                            <span className="text">Settings</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <span className="icon">❓</span>
                            <span className="text">Help/Support</span>
                        </a>
                    </li>
                </ul>
            </nav>

            {/* Main Content */}
            <div className="main-content">
                <header>
                    <div className="header-content">
                        <input type="text" placeholder="Search inventory..." />
                        <div className="user-profile">
                            <span className="emoji">😊</span>
                            <span>Username</span>
                        </div>
                    </div>
                </header>

                <div className="inventory-header">
                    <div className="filters">
                        <select id="categoryFilter">
                            <option value="">Filter by Category</option>
                            <option value="Router">Router</option>
                            <option value="Access Point">Access Point</option>
                            <option value="Switch">Switch</option>
                            <option value="Patch Panel">Patch Panel</option>
                        </select>

                        <select id="statusFilter">
                            <option value="">Filter by Status</option>
                            <option value="In Stock">In Stock</option>
                            <option value="Low Stock">Low Stock</option>
                            <option value="Out of Stock">Out of Stock</option>
                        </select>

                        <input type="number" id="priceMin" placeholder="Min Price" />
                        <input type="number" id="priceMax" placeholder="Max Price" />
                        <button id="filterBtn">Apply Filters</button>
                    </div>
                    <div className="actions">
                        <button onClick={toggleModal}>Add New Item</button>
                        <button id="selectBtn">Select</button>
                    </div>
                </div>

                <div className="inventory-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Category</th>
                                <th>Status</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Router A</td>
                                <td>Router</td>
                                <td>In Stock</td>
                                <td>$100</td>
                                <td>
                                    <button className="edit-btn">Edit</button>
                                    <button className="delete-btn">Delete</button>
                                </td>
                            </tr>
                            <tr>
                                <td>Access Point B</td>
                                <td>Access Point</td>
                                <td>Low Stock</td>
                                <td>$150</td>
                                <td>
                                    <button className="edit-btn">Edit</button>
                                    <button className="delete-btn">Delete</button>
                                </td>
                            </tr>
                            <tr>
                                <td>Switch C</td>
                                <td>Switch</td>
                                <td>Out of Stock</td>
                                <td>$200</td>
                                <td>
                                    <button className="edit-btn">Edit</button>
                                    <button className="delete-btn">Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="modal" id="addItemModal">
                    <div className="modal-content">
                        <span className="close" onClick={toggleModal}>&times;</span>
                        <h2>Add New Item</h2>
                        <form id="addItemForm">
                            <label htmlFor="itemName">Item Name:</label>
                            <input type="text" id="itemName" name="itemName" required />

                            <label htmlFor="category">Category:</label>
                            <select id="category" name="category" required>
                                <option value="Router">Router</option>
                                <option value="Access Point">Access Point</option>
                                <option value="Switch">Switch</option>
                                <option value="Patch Panel">Patch Panel</option>
                            </select>

                            <label htmlFor="status">Status:</label>
                            <select id="status" name="status" required>
                                <option value="In Stock">In Stock</option>
                                <option value="Low Stock">Low Stock</option>
                                <option value="Out of Stock">Out of Stock</option>
                            </select>

                            <label htmlFor="price">Price:</label>
                            <input type="number" id="price" name="price" required />

                            <label htmlFor="description">Description:</label>
                            <textarea id="description" name="description" rows="4"></textarea>

                            <button type="submit">Add Item</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Inventory;