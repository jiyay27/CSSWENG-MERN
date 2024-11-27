import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import '../styles/categories.css';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);
  const [analytics, setAnalytics] = useState({});

  useEffect(() => {
    // Fetch all categories
    // TODO: Backend should provide an endpoint to get all categories
    // Example: GET /api/categories
    fetch('/api/categories')
      .then(response => response.json())
      .then(data => setCategories(data));

    // Fetch category analytics
    // TODO: Backend should provide an endpoint for category analytics
    // Example: GET /api/categories/analytics
    fetch('/api/categories/analytics')
      .then(response => response.json())
      .then(data => setAnalytics(data));
  }, []);

  const addCategory = () => {
    // TODO: Backend should handle adding a new category
    // Example: POST /api/categories
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
    // TODO: Backend should handle updating a category
    // Example: PUT /api/categories/:id
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
    // TODO: Backend should handle deleting a category
    // Example: DELETE /api/categories/:id
    fetch(`/api/categories/${id}`, { method: 'DELETE' })
      .then(() => setCategories(categories.filter(cat => cat.id !== id)));
  };

  return (
    <div className="container">
      <Sidebar />
      <div className="main-content">
        <div className="category-page">
          <h2>Categories</h2>
          <div className="add-category">
            <input
              type="text"
              placeholder="Add new category"
              value={newCategory}
              onChange={e => setNewCategory(e.target.value)}
            />
            <button onClick={addCategory}>Add</button>
          </div>
          <ul className="categories-list">
            {categories.map(cat => (
              <li key={cat.id}>
                {editingCategory === cat.id ? (
                  <input
                    type="text"
                    defaultValue={cat.name}
                    onBlur={e => updateCategory(cat.id, e.target.value)}
                  />
                ) : (
                  <span>{cat.name}</span>
                )}
                <button onClick={() => setEditingCategory(cat.id)}>Edit</button>
                <button onClick={() => deleteCategory(cat.id)}>Delete</button>
              </li>
            ))}
          </ul>
          <div className="category-analytics">
            <h3>Category Analytics</h3>
            {/* Display analytics data */}
            {/* Example: Number of items per category */}
            {/* TODO: Render analytics based on the data structure provided by backend */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;