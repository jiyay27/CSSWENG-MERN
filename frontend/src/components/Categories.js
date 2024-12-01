import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import '../styles/categories.css';
import axios from 'axios';
import config from '../config';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
      try {
          const response = await axios.get(`${config.API_URL}/api/categories/all`);
          console.log('Response:', response.data); // Add this log
          if (response.data.categories) {
              setCategories(response.data.categories);
          }
      } catch (error) {
          console.error('Error fetching categories:', error);
      }
  };

  const addCategory = async () => {
      if (!newCategory.trim()) return;
      
      try {
          const response = await axios.post(`${config.API_URL}/api/categories/add`, {
              categName: newCategory
          });
          console.log('Add category response:', response.data); // Add this log
          fetchCategories(); // Refresh the list
          setNewCategory(''); // Clear the input
      } catch (error) {
          console.error('Error adding category:', error);
      }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`${config.API_URL}/api/categories/delete/${id}`);
      fetchCategories(); // Refresh the list
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  // Filter and sort categories
  const filteredCategories = categories
    .filter(cat => cat.categName.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'name') return a.categName.localeCompare(b.categName);
      return 0;
    });

  return (
    <div className="categories-page">
      <Sidebar />
      <div className="main-content">
        <header>
          <div className="header-content">
            <input
              type="text" 
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="user-profile">
              <span className="emoji">😊</span>
              <span>Username</span>
            </div>
          </div>
        </header>

        <div className="category-page">
          <div className="category-header">
            <h2>Categories Management</h2>
          </div>

          <div className="category-actions">
            <input
              type="text"
              placeholder="Add new category"
              value={newCategory}
              onChange={e => setNewCategory(e.target.value)}
            />
            <button onClick={addCategory}>Add Category</button>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Sort by Name</option>
            </select>
          </div>

          {/* Categories Table */}
          <div className="categories-table">
            <table>
              <thead>
                <tr>
                  <th>Category Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((category) => (
                  <tr key={category._id}>
                    <td>{category.categName}</td>
                    <td>
                      <button 
                        className="delete-btn"
                        onClick={() => deleteCategory(category._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;