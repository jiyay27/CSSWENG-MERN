import React, { useState } from 'react';
import Sidebar from './Sidebar';
import '../styles/inventory.css';
import '../styles/modal.css';

const Inventory = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [newItem, setNewItem] = useState({
        itemName: '',
        category: 'Router',
        status: 'In Stock',
        price: '',
        description: ''
    });

    const toggleModal = () => setModalOpen(!isModalOpen);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewItem(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // backend
        console.log("New Item Added: ", newItem);
        setNewItem({
            itemName: '',
            category: 'Router',
            status: 'In Stock',
            price: '',
            description: ''
        });
        toggleModal();
    };

    return (
        <div className="container">
            <Sidebar />

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
                        </tbody>
                    </table>
                </div>
            </div>

            {isModalOpen && (
                <div className="modal" id="addItemModal">
                    <div className="modal-content">
                        <span className="close" onClick={toggleModal}>&times;</span>
                        <h2>Add New Item</h2>
                        <form id="addItemForm" onSubmit={handleSubmit}>
                            <label htmlFor="itemName">Item Name:</label>
                            <input
                                type="text"
                                id="itemName"
                                name="itemName"
                                value={newItem.itemName}
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="category">Category:</label>
                            <select
                                id="category"
                                name="category"
                                value={newItem.category}
                                onChange={handleChange}
                                required
                            >
                                <option value="Router">Router</option>
                                <option value="Access Point">Access Point</option>
                                <option value="Switch">Switch</option>
                                <option value="Patch Panel">Patch Panel</option>
                            </select>

                            <label htmlFor="status">Status:</label>
                            <select
                                id="status"
                                name="status"
                                value={newItem.status}
                                onChange={handleChange}
                                required
                            >
                                <option value="In Stock">In Stock</option>
                                <option value="Low Stock">Low Stock</option>
                                <option value="Out of Stock">Out of Stock</option>
                            </select>

                            <label htmlFor="price">Price:</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={newItem.price}
                                onChange={handleChange}
                                required
                            />

                            <label htmlFor="description">Description:</label>
                            <textarea
                                id="description"
                                name="description"
                                rows="4"
                                value={newItem.description}
                                onChange={handleChange}
                            ></textarea>

                            <button type="submit">Add Item</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Inventory;
