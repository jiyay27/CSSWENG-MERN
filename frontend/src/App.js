import React from 'react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Dashboard from './components/dashboard';
import Inventory from './components/inventory';
import PendingOrders from './components/PendingOrders';
import ViewOrders from './components/ViewOrders';
import SalesReports from './components/SalesReports';
import InventoryReports from './components/InventoryReports';
import Categories from './components/Categories';
import ForgotPassword from './components/ForgotPassword';
import Settings from './components/Settings';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
    useEffect(() => {
        const darkMode = localStorage.getItem('darkMode');
        if (darkMode === 'true') {
            document.body.classList.add('dark-mode');
        }
    }, []);

    return (
        <Router>
            <ErrorBoundary>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/inventory" element={<Inventory />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/orders/view" element={<ViewOrders />} />
                    <Route path="/orders/pending" element={<PendingOrders />} />
                    <Route path="/reports/sales" element={<SalesReports />} />
                    <Route path="/reports/inventory" element={<InventoryReports />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                </Routes>
            </ErrorBoundary>
        </Router>
    );
}

export default App;