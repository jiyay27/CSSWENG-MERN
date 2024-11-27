import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Dashboard from './components/dashboard';
import Inventory from './components/inventory';
import PendingOrders from './components/PendingOrders';
import ViewOrders from './components/ViewOrders';
import SalesReports from './components/SalesReports';
import InventoryReports from './components/InventoryReports';
import ViewItems from './components/ViewItems';
import Categories from './components/Categories'; // Import the Categories component

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/categories" element={<Categories />} /> {/* Add this route */}
                <Route path="/orders/view" element={<ViewOrders />} />
                <Route path="/orders/pending" element={<PendingOrders />} />
                <Route path="/reports/sales" element={<SalesReports />} />
                <Route path="/reports/inventory" element={<InventoryReports />} />
            </Routes>
        </Router>
    );
}

export default App;