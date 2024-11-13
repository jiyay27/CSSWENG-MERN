import React, { useEffect, useState, useCallback } from 'react';
import '../styles/orders.css';
import Sidebar from './Sidebar';

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
                const response = await fetch('http://localhost:5000/api/orders');
                const data = await response.json();
                
                // Calculate total number of pages
                setTotalPages(Math.ceil(data.length / ordersPerPage));
                
                // Update orders state with pagination info
                setOrders(prevOrders => [...prevOrders, ...data.slice(indexOfFirstOrder, indexOfLastOrder)]);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setLoading(false);
            }
        };
        
        fetchOrders();
    }, []);

    const searchOrders = useCallback((searchTerm) => {
        const filteredOrders = orders.filter(order =>
            order.itemName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return filteredOrders;
    }, []);

    const handleSearch = (event) => {
        const searchTermValue = event.target.value;
        setSearchTerm(searchTermValue);
    };

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = searchOrders(searchTerm);
    const slicedOrders = currentOrders.slice(indexOfFirstOrder, indexOfLastOrder);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <Sidebar />
            <div className="main-content">
                <header>
                    <div className="header-content">
                        <input 
                            type="text" 
                            placeholder="Search orders..." 
                            value={searchTerm} 
                            onChange={handleSearch}
                        />
                        <div className="user-profile">
                            <span className="emoji">😊</span>
                            <span>Username</span>
                        </div>
                    </div>
                </header>
                <div className="orders">
                    <h2>View Orders</h2>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        <>
                            <button onClick={() => paginate(1)}>First Page</button>
                            <button onClick={() => paginate(currentPage - 1)}>Previous</button>
                            <span>{currentPage}</span>
                            <button onClick={() => paginate(currentPage + 1)}>Next</button>
                            <button onClick={() => paginate(Math.ceil(slicedOrders.length / ordersPerPage))}>Last Page</button>
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
                                    {slicedOrders.map(order => (
                                        <tr key={order._id}>
                                            <td>{order._id}</td>
                                            <td>{order.itemName}</td>
                                            <td>{order.status}</td>
                                            <td>${order.price}</td>
                                            <td>{new Date(order.date).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ViewOrders;
