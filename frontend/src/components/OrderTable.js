// src/components/OrderTable.js
import React from 'react';

const OrderTable = ({ orders }) => {
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
            <td>{order._id}</td>
            <td>{order.itemName}</td>
            <td>{order.status}</td>
            <td>${order.price}</td>
            <td>{new Date(order.date).toLocaleDateString()}</td>
            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderTable;