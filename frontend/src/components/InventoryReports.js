import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Table from 'react-bootstrap/Table';
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
  const [inventoryData, setInventoryData] = useState([]);

  useEffect(() => {
    const fetchInventoryData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/items');
        setInventoryData(response.data);
      } catch (error) {
        console.error('Error fetching inventory data:', error);
      }
    };

    fetchInventoryData();
  }, []);

  const barData = {
    labels: inventoryData.map(item => item.itemName),
    datasets: [
      {
        label: 'Quantity',
        data: inventoryData.map(item => item.quantity),
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Stock':
        return 'green';
      case 'Low Stock':
        return 'orange';
      case 'Out of Stock':
        return 'red';
      default:
        return 'black';
    }
  };

  return (
    <div className="container">
      <Sidebar />
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
            <h3>Stock Levels</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Status</th>
                  <th>Reorder Level</th>
                </tr>
              </thead>
              <tbody>
                {inventoryData.map((item) => (
                  <tr key={item._id}>
                    <td>{item.itemName}</td>
                    <td>{item.quantity}</td>
                    <td style={{ color: getStatusColor(item.status) }}>{item.status}</td>
                    <td>{item.reorderLevel}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className="report-card" style={{ marginTop: '2rem' }}>
            <h3>Stock Levels Graph</h3>
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryReports;
