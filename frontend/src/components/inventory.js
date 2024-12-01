// inventory.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import '../styles/inventory.css';
import { formatCurrency } from '../utils/currency';
import config from '../config';

const Inventory = () => {
    const [items, setItems] = useState([]);  // State to store items
    const [newItem, setNewItem] = useState({
        itemName: '',
        category: 'Router',
        status: 'In Stock',
        price: '',
        quantity: '',
        description: ''
    });
    const [editItemId, setEditItemId] = useState(null); // State for the item being edited
    const [editFormData, setEditFormData] = useState({
        itemName: '',
        category: '',
        status: '',
        price: '',
        quantity: '',
        description: ''
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        category: '',
        status: '',
        priceMin: '',
        priceMax: ''
    });

    const [isAddingNew, setIsAddingNew] = useState(false);
    const [isCreatingCustomCategory, setIsCreatingCustomCategory] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const [quantities, setQuantities] = useState({});

    const toggleAddNew = () => {
        setIsAddingNew(!isAddingNew);
    };

    // Fetch items from the backend
    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await axios.get(`${config.API_URL}/api/items`);
            if (response.data) {
                setItems(response.data);
            }
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'category') {
            if (value === '') {
                setIsCreatingCustomCategory(true);
            } else if (fixedCategories.includes(value)) {
                setNewItem(prevState => ({
                    ...prevState,
                    [name]: value
                }));
        }
        } else {
            setNewItem(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    // Add new item
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${config.API_URL}/api/items/add`, {
                ...newItem,
                customCategories: addedCustomCategories
            });

            if (response.data.newItem) {
                // Optimistic update
                setItems(prevItems => [...prevItems, response.data.newItem]);
                setNewItem({
                    itemName: '',
                    category: 'Router',
                    status: 'In Stock',
                    price: '',
                    quantity: '',
                    description: ''
                });
                setAddedCustomCategories([]);
                setIsAddingNew(false);
            }
        } catch (error) {
            console.error('Error adding item:', error);
            // Rollback on error
            fetchItems();
        }
    };

    // Delete item
    const handleDeleteClick = async (itemId) => {
        try {
            // Optimistic update
            setItems(prevItems => prevItems.filter(item => item._id !== itemId));
            
            await axios.delete(`${config.API_URL}/api/items/delete/${itemId}`);
        } catch (error) {
            console.error('Error deleting item:', error);
            // Rollback on error
            fetchItems();
        }
    };

    // Edit item (open modal with pre-filled values)
    const handleEditClick = (event, item) => {
        event.preventDefault();
        setEditItemId(item._id);

        const formValues = {
            itemName: item.itemName,
            category: item.category,
            status: item.status,
            price: item.price,
            quantity: item.quantity,
            description: item.description
        };

        setEditFormData(formValues);
    };

    // Handle input change in edit form
    const handleEditFormChange = (event) => {
        const { name, value } = event.target;
    
        setEditFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle edit form submit
    const handleEditFormSubmit = async (event) => {
        event.preventDefault();
        const editedItem = { ...editFormData };
    
        try {
            const response = await axios.put(`${config.API_URL}/api/items/update/${editItemId}`, editedItem);
    
            if (response.data.updatedItem) {
                // Update the items list
                setItems(prevItems => 
                    prevItems.map(item => 
                        item._id === editItemId ? response.data.updatedItem : item
                    )
                );
    
                // Show success message
                setSuccessMessage('Item updated successfully!');
                setShowSuccessPopup(true);
                setTimeout(() => setShowSuccessPopup(false), 3000);
    
                // Exit edit mode
                handleCancelClick();
            }
        } catch (error) {
            console.error('Error updating item:', error);
            // Rollback on error
            fetchItems();
        }
    };

    // Cancel editing
    const handleCancelClick = () => {
    setEditItemId(null);
    setEditFormData({
        itemName: '',
        category: '',
        status: '',
        price: '',
        quantity: '',
        description: ''
    });
};

    const handleIncrement = async (itemId) => {
        try {
            const response = await axios.patch(`https://innovasion-enterprise.onrender.com/api/items/increment/${itemId}`);
            console.log('Increment response:', response.data); // Log the response for debugging
    
            if (response.data.success) {
                const updatedItem = response.data.updateItem;
    
                // Update the item in the `items` array
                setItems(prevItems =>
                    prevItems.map(item => 
                        item._id === updatedItem._id ? { ...item, quantity: updatedItem.quantity } : item
                    )
                );
    
                // Update the `quantities` state
                setQuantities(prevQuantities => ({
                    ...prevQuantities,
                    [itemId]: updatedItem.quantity
                }));
            } else {
                console.error('Error incrementing quantity:', response.data.message);
            }
        } catch (error) {
            console.error('Error incrementing quantity:', error);
        }
    };
    
    const handleDecrement = async (itemId) => {
        try {
            const response = await axios.patch(`https://innovasion-enterprise.onrender.com/api/items/decrement/${itemId}`);
            console.log('Decrement response:', response.data); // Log the response for debugging
    
            if (response.data.success) {
                const updatedItem = response.data.updateItem;
    
                // Update the item in the `items` array
                setItems(prevItems =>
                    prevItems.map(item => 
                        item._id === updatedItem._id ? { ...item, quantity: updatedItem.quantity } : item
                    )
                );
    
                // Update the `quantities` state
                setQuantities(prevQuantities => ({
                    ...prevQuantities,
                    [itemId]: updatedItem.quantity
                }));
            } else {
                console.error('Error decrementing quantity:', response.data.message);
            }
        } catch (error) {
            console.error('Error decrementing quantity:', error);
        }
    };
    
    const filteredItems = items.filter(item => {
        const matchesCategory = !filters.category || item.category === filters.category;
        const matchesStatus = !filters.status || item.status === filters.status;
        const matchesPriceMin = !filters.priceMin || item.price >= filters.priceMin;
        const matchesPriceMax = !filters.priceMax || item.price <= filters.priceMax;
        const matchesSearch = !searchTerm || 
            item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase());
    
        return matchesCategory && matchesStatus && matchesPriceMin && matchesPriceMax && matchesSearch;
    });

    const [fixedCategories, setFixedCategories] = useState(['Router', 'Access Point', 'Switch', 'Patch Panel', 'Cloud Key']);
    const [customCategories, setCustomCategories] = useState([]);
    const [customCategoryInput, setCustomCategoryInput] = useState('');
    const [addedCustomCategories, setAddedCustomCategories] = useState([]);

    const addCustomCategory = () => {
        if (customCategoryInput.trim()) {
        setAddedCustomCategories(prev => [...prev, customCategoryInput]);
        setCustomCategoryInput('');
        setIsCreatingCustomCategory(false);
        }
    };

    const handleCreateCustomCategory = () => {
        setIsCreatingCustomCategory(true);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        // Convert price values to numbers or empty string
        const numericValue = (name === 'priceMin' || name === 'priceMax') 
            ? (value === '' ? '' : parseFloat(value))
            : value;
    
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: numericValue
        }));
    };

    const exportToCSV = async () => {
        try {
            // Get all items
            const response = await axios.get('https://innovasion-enterprise.onrender.com' + '/api/items');
            const items = response.data;
            
            // Convert items to CSV format
            const csvContent = [
                // CSV Header
                ['Item Name', 'Category', 'Status', 'Price', 'Quantity', 'Description'].join(','),
                // CSV Data
                ...items.map(item => [
                    item.itemName,
                    item.category,
                    item.status,
                    item.price,
                    item.quantity,
                    item.description.replace(/,/g, ';') // Replace commas in description with semicolons
                ].join(','))
            ].join('\n');
    
            // Create and download the CSV file
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', 'inventory.csv');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error exporting to CSV:', error);
        }
    };

    return (
        <div className="container">
            <Sidebar />

            <div className="main-content">
                <header>
                    <div className="header-content">
                        <input
                            type="text"
                            placeholder="Search inventory..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className="button-group">
                            <button className="add-new-item-button" onClick={toggleAddNew}>
                                {isAddingNew ? 'Close Form' : 'Add New Item'}
                            </button>
                            <button className="export-csv-button" onClick={exportToCSV}>
                                Export to CSV
                            </button>
                        </div>
                    </div>
                </header>

                {isAddingNew && (
                    <div className="add-item-card">
                        <h2>Add New Item</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="itemName">Item Name</label>
                                <input
                                    type="text"
                                    id="itemName"
                                    name="itemName"
                                    value={newItem.itemName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="category">Category</label>
                                <select 
                                    id="category"
                                    name="category"
                                    value={newItem.category}
                                    onChange={handleChange}
                                >
                                    {fixedCategories.map((category) => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="status">Status</label>
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
                            </div>

                            <div className="form-group">
                                <label htmlFor="price">Price</label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={newItem.price}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="quantity">Quantity</label>
                                <input
                                    type="number"
                                    id="quantity"
                                    name="quantity"
                                    value={newItem.quantity}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group description-group">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="text"
                                    id="description"
                                    name="description"
                                    value={newItem.description}
                                    onChange={handleChange}
                                />
                            </div>

                            <button type="submit">Add Item</button>
                        </form>
                    </div>
                )}

                <div className="inventory-header">
                    <div className="filters">
                        <select name="category" value={filters.category} onChange={handleFilterChange}>
                            <option value="">Filter by Category</option>
                            <option value="Router">Router</option>
                            <option value="Access Point">Access Point</option>
                            <option value="Switch">Switch</option>
                            <option value="Patch Panel">Patch Panel</option>
                            <option value="Cloud Key">Cloud Key</option>
                        </select>

                        <select name="status" value={filters.status} onChange={handleFilterChange}>
                            <option value="">Filter by Status</option>
                            <option value="In Stock">In Stock</option>
                            <option value="Low Stock">Low Stock</option>
                            <option value="Out of Stock">Out of Stock</option>
                        </select>

                        <input
                            type="number"
                            name="priceMin"
                            placeholder="Min Price"
                            value={filters.priceMin}
                            onChange={handleFilterChange}
                        />
                        <input
                            type="number"
                            name="priceMax"
                            placeholder="Max Price"
                            value={filters.priceMax}
                            onChange={handleFilterChange}
                        />
                    </div>
                </div>

                <div className="inventory-table">
                    <form onSubmit={handleEditFormSubmit}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Item Name</th>
                                    <th>Quantity</th>
                                    <th>Status</th>
                                    <th>Price</th>
                                    <th>Category</th>
                                    <th>Description</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
    {filteredItems.map((item) =>
        editItemId === item._id ? (
        // Edit Mode Row
        <tr key={item._id}>
            <td>
                <input
                    type="text"
                    required
                    name="itemName"
                    value={editFormData.itemName}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    type="number"
                    required
                    name="quantity"
                    value={editFormData.quantity}
                    onChange={handleEditFormChange}
                    min="0"
                />
            </td>
            <td>
                <select
                    name="status"
                    value={editFormData.status}
                    onChange={handleEditFormChange}
                >
                    <option value="In Stock">In Stock</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                </select>
            </td>
            <td>
                <input
                    type="number"
                    required
                    name="price"
                    value={editFormData.price}
                    onChange={handleEditFormChange}
                    min="0"
                    step="0.01"
                />
            </td>
            <td>
                <input
                    type="text"
                    required
                    name="category"
                    value={editFormData.category}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <input
                    type="text"
                    required
                    name="description"
                    value={editFormData.description}
                    onChange={handleEditFormChange}
                />
            </td>
            <td>
                <button type="submit" className="save-btn">
                    Save
                </button>
                <button type="button" onClick={handleCancelClick} className="cancel-btn">
                    Cancel
                </button>
            </td>
        </tr>
        ) : (
        <tr key={item._id}>
            <td>{item.itemName}</td>
            <td>
            <input type="number" value={item.quantity} disabled />
            </td>
            <td>{item.status}</td>
            <td>{formatCurrency(item.price)}</td>
            <td>{item.category}</td>
            <td>{item.description}</td>
            <td>
            <button
                type="button"
                onClick={(event) => handleEditClick(event, item)}
                className="edit-btn"
            >
                Edit
            </button>
            <button
                type="button"
                onClick={() => handleDeleteClick(item._id)}
                className="delete-btn"
            >
                Delete
            </button>
            </td>
        </tr>
        )
    )}
</tbody>
                        </table>
                    </form>
                </div>
            </div>
            {showSuccessPopup && (
                <div className="success-popup">
                    <p>{successMessage}</p>
                </div>
            )}
        </div>
    );
};

export default Inventory;
