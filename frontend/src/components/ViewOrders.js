import React from 'react';
import '../styles/orders.css';
import Sidebar from './Sidebar';

const ViewOrders = () => {
    const orders = [
        { id: 1, itemName: 'Router A', status: 'Completed', price: '$100', date: '2024-10-01' },
        { id: 2, itemName: 'Access Point B', status: 'Completed', price: '$150', date: '2024-10-02' }
    ];

    return (
        <div className="container">
            <Sidebar />
            <div className="main-content">
                <header>
                    <div className="header-content">
                        <input type="text" placeholder="Search orders..." />
                        <div className="user-profile">
                            <span className="emoji">😊</span>
                            <span>Username</span>
                        </div>
                    </div>
                </header>
                <div className="orders">
                    <h2>View Orders</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Item Name</th>
                                <th>Status</th>
                                <th>Price</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.itemName}</td>
                                    <td>{order.status}</td>
                                    <td>{order.price}</td>
                                    <td>{order.date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ViewOrders;