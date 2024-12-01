// AddItem.js

import React, { useState } from 'react';
import axios from 'axios';
import '../styles/inventory.css';
import config from '../config';

const AddItem = () => {
  const [formData, setFormData] = useState({
    itemName: '',
    category: '',
    status: 'In Stock',
    price: '',
    quantity: '',
    description: '',
  });

  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${config.API_URL}/api/items/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSuccessMessage('Item added successfully!');
        // Optionally, clear the form
        setFormData({
          itemName: '',
          category: '',
          status: 'In Stock',
          price: '',
          quantity: '',
          description: '',
        });
      } else {
        console.error('Error adding item:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <div className="main-content">
      <div className="add-item-card">
        <h2>Add New Item</h2>
        {successMessage && <div className="success-message">{successMessage}</div>}
        <form onSubmit={handleSubmit}>
          <label>Item Name</label>
          <input
            type="text"
            name="itemName"
            value={formData.itemName}
            onChange={handleChange}
            required
          />

          <label>Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />

          <label>Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>

          <label>Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />

          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            min="0"
          />

          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>

          <button type="submit" className="add-item-button">
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItem;