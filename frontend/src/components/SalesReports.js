import React from 'react';
import { Bar } from 'react-chartjs-2';
import Sidebar from './Sidebar';

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

const SalesReports = () => {
    const salesData = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                label: "Total Sales",
                data: [500, 600, 800, 700, 900, 750],
                backgroundColor: "rgba(75, 192, 192, 0.6)"
            }
        ]
    };

    const salesOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Monthly Sales"
            }
        }
    };

    return (
        <div className="container">
            <Sidebar />
            <div className="main-content">
                <header>
                    <div className="header-content">
                        <input type="text" placeholder="Search sales reports..." />
                        <div className="user-profile">
                            <span className="emoji">😊</span>
                            <span>Username</span>
                        </div>
                    </div>
                </header>
                <div className="reports">
                    <h2>Sales Reports</h2>
                    <div className="report-card">
                        <h3>Total Sales</h3>
                        <p>$5000</p>
                    </div>
                    <div className="report-card">
                        <h3>Sales by Category</h3>
                        <ul>
                            <li>Electronics: $2000</li>
                            <li>Furniture: $1500</li>
                            <li>Clothing: $1500</li>
                        </ul>
                    </div>
                    <div className="report-card">
                        <h3>Sales Graph</h3>
                        <Bar data={salesData} options={salesOptions} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalesReports;
