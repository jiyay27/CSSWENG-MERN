import React, { useEffect, useState } from 'react';
import '../styles/orders.css';
import Sidebar from './Sidebar';
import OrderTable from './OrderTable';
import OrderForm from './OrderForm';
import config from '../config';

const ViewOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const [totalPages, setTotalPages] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage, setOrdersPerPage] = useState(10);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch(`${config.API_URL}/api/orders`);
                const data = await response.json();
                setOrders(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setLoading(false);
            }
        };
        
        fetchOrders();
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
            setOrders([...orders, data]);
        } catch (error) {
            console.error('Error creating order:', error);
    }
    };

    const handleOrderDelete = async (orderId) => {
        try {
            const response = await fetch(`${config.API_URL}/api/orders/delete/${orderId}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                // Remove the deleted order from state
                setOrders(orders.filter(order => order._id !== orderId));
            }
        } catch (error) {
            console.error('Error deleting order:', error);
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
                    <h2>View All Orders</h2>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <>
                            <OrderForm onSubmit={handleOrderSubmit} />
                            <OrderTable orders={orders} onDelete={handleOrderDelete} />
                            {/* Pagination buttons */}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ViewOrders;
