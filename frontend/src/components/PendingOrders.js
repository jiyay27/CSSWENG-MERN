import React, { useEffect, useState } from 'react';
import '../styles/orders.css';
import Sidebar from './Sidebar';
import OrderTable from './OrderTable';
import OrderForm from './OrderForm';
import config from '../config';

const PendingOrders = () => {
    const [pendingOrders, setPendingOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPendingOrders = async () => {
        try {
            const response = await fetch(`${config.API_URL}/api/orders`);
            const data = await response.json();
            // Filter only pending orders
            const pending = data.filter(order => order.status === 'Pending');
            setPendingOrders(pending);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching pending orders:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPendingOrders();
    }, []);

    const handleOrderSubmit = async (newOrder) => {
        try {
            const response = await fetch(`${config.API_URL}/api/orders/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newOrder)
            });
            if (response.ok) {
                fetchPendingOrders(); // Refresh the list after adding
            }
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    const handleOrderDelete = async (orderId) => {
        try {
            setPendingOrders(pendingOrders.filter(order => order._id !== orderId));
            await fetchPendingOrders(); // Refresh the list after deletion
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    return (
        <div className="container">
            <Sidebar />
            <div className="main-content">
                <div className="orders">
                    <h2>Pending Orders</h2>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <>
                            <OrderForm onSubmit={handleOrderSubmit} />
                            <OrderTable 
                                orders={pendingOrders}
                                onDelete={handleOrderDelete}
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PendingOrders;