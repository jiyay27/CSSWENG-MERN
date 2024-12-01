import React, { useEffect, useState } from 'react';
import '../styles/orders.css';
import Sidebar from './Sidebar';
import OrderTable from './OrderTable';
import OrderForm from './OrderForm';
import config from '../config';

const PendingOrders = () => {
    const [pendingOrders, setPendingOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPendingOrders = async () => {
            try {
                const response = await fetch(`${config.API_URL}/api/orders?status=pending`);
                const data = await response.json();
                setPendingOrders(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching pending orders:', error);
                setLoading(false);
            }
        };

        fetchPendingOrders();
    }, []);

    const handleOrderSubmit = async (newOrder) => {
        try {
            const response = await fetch(`${config.API_URL}/api/orders`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(newOrder),
            });
            const data = await response.json();
            setPendingOrders([...pendingOrders, data]);
        } catch (error) {
            console.error('Error creating pending order:', error);
      }
    };

    return (
        <div className="container">
            <Sidebar />
            <div className="main-content">
                <header>
                    {/* Header content */}
                </header>
                <div className="orders">
                    <h2>Pending Orders</h2>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <>
                          <OrderForm onSubmit={handleOrderSubmit} />
                          <OrderTable orders={pendingOrders} />
                          {/* Status update buttons */}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PendingOrders;
