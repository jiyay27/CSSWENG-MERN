import React from 'react';
import config from '../config';

const OrderTable = ({ orders, onDelete }) => {
  const handleDelete = async (orderId) => {
    try {
      const response = await fetch(`${config.API_URL}/api/orders/delete/${orderId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        onDelete(orderId); // Call parent's delete handler to update UI
      } else {
        console.error('Failed to delete order');
      }
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Order ID</th>
          <th>Item Name</th>
          <th>Status</th>
          <th>Price</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map(order => (
          <tr key={order._id}>
            <td>{order.orderID}</td>
            <td>{order.itemName}</td>
            <td>{order.status}</td>
            <td>${order.price}</td>
            <td>{new Date(order.date).toLocaleDateString()}</td>
            <td>
              <button 
                type="button" 
                className="delete-btn"
                onClick={() => handleDelete(order._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderTable;