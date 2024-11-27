import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import '../styles/categories.css';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryStats, setCategoryStats] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name'); // 'name', 'items', 'created'

  useEffect(() => {
    // Fetch all categories
    fetch('/api/categories')
      .then(response => response.json())
      .then(data => setCategories(data));

    // Fetch category analytics
    fetch('/api/categories/analytics')
      .then(response => response.json())
      .then(data => setCategoryStats(data));
  }, []);

  const addCategory = () => {
    const category = { name: newCategory };
    fetch('/api/categories', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(category)
    })
      .then(response => response.json())
      .then(data => setCategories([...categories, data]));
    setNewCategory('');
  };

  const updateCategory = (id, name) => {
    fetch(`/api/categories/${id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ name })
    })
      .then(response => response.json())
      .then(() => {
        setCategories(categories.map(cat => (cat.id === id ? { id, name } : cat)));
        setEditingCategory(null);
      });
  };

  const deleteCategory = (id) => {
    fetch(`/api/categories/${id}`, { method: 'DELETE' })
      .then(() => setCategories(categories.filter(cat => cat.id !== id)));
  };

  // Add search and filter functionality
  const filteredCategories = categories
    .filter(cat => cat.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'items') return (categoryStats[b.id]?.itemCount || 0) - (categoryStats[a.id]?.itemCount || 0);
      if (sortBy === 'created') return new Date(b.createdAt) - new Date(a.createdAt);
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
              <option value="items">Sort by Items</option>
              <option value="created">Sort by Date Created</option>
            </select>
          </div>

          <div className="category-grid">
            {filteredCategories.map(cat => (
              <div key={cat.id} className="category-card">
                {editingCategory === cat.id ? (
                  <input
                    type="text"
                    defaultValue={cat.name}
                    onBlur={e => updateCategory(cat.id, e.target.value)}
                    autoFocus
                  />
                ) : (
                  <>
                    <h3>{cat.name}</h3>
                    <div className="category-stats">
                      <span>🏷️ {categoryStats[cat.id]?.itemCount || '0'} items</span>
                      <span>📅 Created {new Date(cat.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="category-actions">
                      <button onClick={() => setEditingCategory(cat.id)}>✏️ Edit</button>
                      <button onClick={() => deleteCategory(cat.id)}>🗑️ Delete</button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          <div className="category-analytics">
            <h3>Category Analytics</h3>
            <div className="analytics-grid">
              <div className="stat-card">
                <h4>Total Categories</h4>
                <p>{categories.length}</p>
              </div>
              <div className="stat-card">
                <h4>Most Used Category</h4>
                <p>Router (23 items)</p>
              </div>
              <div className="stat-card">
                <h4>Recent Activity</h4>
                <ul>
                  <li>Added "Wireless" category</li>
                  <li>Updated "Router" category</li>
                  <li>Deleted "Old Equipment" category</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;