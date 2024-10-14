import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import '../styles/reports.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const InventoryReports = () => {
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
    const toggleSidebar = () => setSidebarCollapsed(!isSidebarCollapsed);

    const inventoryData = [
        { id: 1, itemName: 'Router A', stockLevel: 20, reorderLevel: 10, status: 'In Stock', date: '2024-10-01' },
        { id: 2, itemName: 'Switch B', stockLevel: 5, reorderLevel: 20, status: 'Low Stock', date: '2024-10-02' }
    ];

    const barData = {
        labels: inventoryData.map(item => item.itemName),
        datasets: [
            {
                label: 'Stock Level',
                data: inventoryData.map(item => item.stockLevel),
                backgroundColor: 'rgba(54, 162, 235, 0.6)'
            }
        ]
    };

    const barOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: 'Inventory Stock Levels'
            }
        }
    };

    return (
        <div className="container">
            <Sidebar isSidebarCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
            <div className="main-content">
                <header>
                    <div className="header-content">
                        <input type="text" placeholder="Search inventory reports..." />
                        <div className="user-profile">
                            <span className="emoji">😊</span>
                            <span>Username</span>
                        </div>
                    </div>
                </header>
                <div className="reports">
                    <h2>Inventory Reports</h2>
                    <div className="report-card">
                        <h3>Reorder Alerts</h3>
                        <ul>
                            {inventoryData.map(item => (
                                item.stockLevel < item.reorderLevel && (
                                    <li key={item.id}>{item.itemName} - Only {item.stockLevel} left</li>
                                )
                            ))}
                        </ul>
                    </div>
                    <div className="report-card">
                        <h3>Stock Status</h3>
                        <ul>
                            {inventoryData.map(item => (
                                <li key={item.id}>
                                    {item.itemName}: {item.status}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="report-card">
                        <h3>Stock Levels Graph</h3>
                        <Bar data={barData} options={barOptions} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InventoryReports;
