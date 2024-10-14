import React from 'react';
import '../styles/orders.css';
import Sidebar from './Sidebar';

const PendingOrders = () => {
    const pendingOrders = [
        { id: 3, itemName: 'Switch C', status: 'Pending', price: '$200', date: '2024-10-03' },
        { id: 4, itemName: 'Patch Panel D', status: 'Pending', price: '$250', date: '2024-10-04' }
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
                    <h2>Pending Orders</h2>
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
                            {pendingOrders.map(order => (
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

export default PendingOrders;
