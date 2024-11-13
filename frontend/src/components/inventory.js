// inventory.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import '../styles/inventory.css';

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
    const [editItem, setEditItem] = useState(null); // State for the item being edited
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        category: '',
        status: '',
        priceMin: '',
        priceMax: ''
    });

    const [isAddingNew, setIsAddingNew] = useState(false);
    const [isCreatingCustomCategory, setIsCreatingCustomCategory] = useState(false);

    const [quantities, setQuantities] = useState({});

    const toggleAddNew = () => {
        setIsAddingNew(!isAddingNew);
    };

    // Fetch items from the backend
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/items');
                const data = await response.json();
                setItems(data);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        };

        fetchItems();
    }, []);

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
            const response = await fetch('http://localhost:5000/api/items/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...newItem,
                    customCategories: addedCustomCategories
                }),
            });

            const data = await response.json();
            if (response.ok) {
                setItems([...items, data.newItem]);
                setNewItem({
                    itemName: '',
                    category: 'Router',
                    status: 'In Stock',
                    price: '',
                    quantity: '',
                    description: ''
                });
                setAddedCustomCategories([]);
            } else {
                console.error('Error adding item:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    // Delete item
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this item?")) return;
        
        try {
            const response = await fetch(`http://localhost:5000/api/items/delete/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setItems(items.filter(item => item._id !== id));
                setQuantities(prevQuantities => {
                    const newQuantities = {...prevQuantities};
                    delete newQuantities[id];
                    return newQuantities;
                });
            } else {
                console.error('Error deleting item');
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    // Edit item (open modal with pre-filled values)
    const handleEdit = (item) => {
        setEditItem(item);
    };

    // Save edited item
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting edit for item:", editItem);  // Debugging line
        try {
            const response = await fetch(`http://localhost:5000/api/items/update/${editItem._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editItem),
            });
    
            if (response.ok) {
                const updatedItem = await response.json();
                console.log("Item updated successfully:", updatedItem); // Debugging line
    
                // Update the state with the newly edited item
                setItems(items.map(item => item._id === updatedItem.updatedItem._id ? updatedItem.updatedItem : item));
                setEditItem(null);  // Close edit modal
            } else {
                console.error('Error updating item:', await response.json());
            }
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };
    
    const handleIncrement = async (itemId) => {
        try {
            const response = await axios.patch(`http://localhost:5000/api/items/increment/${itemId}`);
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
            const response = await axios.patch(`http://localhost:5000/api/items/decrement/${itemId}`);
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
    

    // Filter items based on selected filters
    const filteredItems = items.filter(item => {
        return (
            (filters.category === '' || item.category === filters.category) &&
            (filters.status === '' || item.status === filters.status) &&
            (filters.priceMin === '' || item.price >= Number(filters.priceMin)) &&
            (filters.priceMax === '' || item.price <= Number(filters.priceMax)) &&
            (searchTerm === '' || item.itemName.toLowerCase().includes(searchTerm.toLowerCase()))
        );
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
        setFilters({
            ...filters,
            [name]: value
        });
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
                        
                        <button className="add-new-item-button" onClick={toggleAddNew}>
                          {isAddingNew ? 'Close Form' : 'Add New Item'}
                        </button>
                    </div>
                </header>

                {isAddingNew && (
                    <div className="add-item-card">
                        <h2>Add New Item</h2>
                        <form onSubmit={handleSubmit}>
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
                            <div className="category-input">
                                {!isCreatingCustomCategory && (
                                    <select 
                                        id="category"
                                        name="category"
                                        value={newItem.category || ''}
                                        onChange={(e) => handleChange(e)}
                                    >
                                        <option value="">Select a category</option>
                                        {fixedCategories.map((category) => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                )}
                                {isCreatingCustomCategory && (
                                    <input
                                        type="text"
                                        placeholder="Enter custom category..."
                                        value={customCategoryInput}
                                        onChange={(e) => setCustomCategoryInput(e.target.value)}
                                    />
                                )}
                                {isCreatingCustomCategory && (
                                    <button onClick={() => setIsCreatingCustomCategory(false)}>Cancel</button>
                                )}
                                {isCreatingCustomCategory && (
                                    <button onClick={addCustomCategory}>Add Custom Category</button>
                                )}
                            </div>

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

                            <label htmlFor="quantity">Quantity:</label>
                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                value={newItem.quantity}
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
                    <table>
                        <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Category</th>
                                <th>Status</th>
                                <th>Price</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredItems.map(item => (
                                <tr key={item._id}>
                                    <td>{item.itemName}</td>
                                    <td>{item.category}</td>
                                    <td>{item.status}</td>
                                    <td>${item.price}</td>
                                    <td>
                                        <button className="increment-btn" onClick={() => handleIncrement(item._id)}>+</button>
                                        <span>{item.quantity}</span>
                                        <button className="decrement-btn" onClick={() => handleDecrement(item._id)}>-</button>
                                        <button className="edit-btn" onClick={() => handleEdit(item)}>Edit</button>
                                        <button className="delete-btn" onClick={() => handleDelete(item._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Edit Modal */}
                {editItem && (
                    <div className="edit-modal">
                        <h2>Edit Item</h2>
                        <form onSubmit={handleEditSubmit}>
                            <label htmlFor="itemName">Item Name:</label>
                            <input
                                type="text"
                                name="itemName"
                                value={editItem.itemName}
                                onChange={(e) => setEditItem({ ...editItem, itemName: e.target.value })}
                                required
                            />

                            <label htmlFor="category">Category:</label>
                            <select
                                name="category"
                                value={editItem.category}
                                onChange={(e) => setEditItem({ ...editItem, category: e.target.value })}
                                required
                            >
                                <option value="Router">Router</option>
                                <option value="Access Point">Access Point</option>
                                <option value="Switch">Switch</option>
                                <option value="Patch Panel">Patch Panel</option>
                                <option value="Cloud Key">Cloud Key</option>
                            </select>

                            <label htmlFor="status">Status:</label>
                            <select
                                name="status"
                                value={editItem.status}
                                onChange={(e) => setEditItem({ ...editItem, status: e.target.value })}
                                required
                            >
                                <option value="In Stock">In Stock</option>
                                <option value="Low Stock">Low Stock</option>
                                <option value="Out of Stock">Out of Stock</option>
                            </select>

                            <label htmlFor="price">Price:</label>
                            <input
                                type="number"
                                name="price"
                                value={editItem.price}
                                onChange={(e) => setEditItem({ ...editItem, price: e.target.value })}
                                required
                            />

                            <label htmlFor="quantity">Quantity:</label>
                            <input
                                type="number"
                                name="quantity"
                                value={editItem.quantity}
                                onChange={(e) => setEditItem({ ...editItem, quantity: e.target.value })}
                                required
                            />

                            <label htmlFor="description">Description:</label>
                            <textarea
                                name="description"
                                rows="4"
                                value={editItem.description}
                                onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
                            ></textarea>

                            <button type="submit">Save Changes</button>
                            <button type="button" onClick={() => setEditItem(null)}>Cancel</button>

                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Inventory;
