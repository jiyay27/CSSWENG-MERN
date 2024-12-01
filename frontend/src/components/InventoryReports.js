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
import config from '../config';

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
        const response = await axios.get(`${config.API_URL}/api/items`);
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
        position: 'top',
        labels: {
          color: document.body.classList.contains('dark-mode') ? '#fff' : '#333',
          font: {
            size: 12,
            weight: '500'
          }
        }
      },
      title: {
        display: true,
        text: 'Inventory Stock Levels',
        color: document.body.classList.contains('dark-mode') ? '#fff' : '#333',
        font: {
          size: 16,
          weight: '600'
        }
      }
    },
    scales: {
      y: {
        grid: {
          color: document.body.classList.contains('dark-mode') ? 
            'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          color: document.body.classList.contains('dark-mode') ? '#fff' : '#333'
        }
      },
      x: {
        grid: {
          color: document.body.classList.contains('dark-mode') ? 
            'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          color: document.body.classList.contains('dark-mode') ? '#fff' : '#333'
        }
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
                </tr>
              </thead>
              <tbody>
                {inventoryData.map((item) => (
                  <tr key={item._id}>
                    <td>{item.itemName}</td>
                    <td>{item.quantity}</td>
                    <td style={{ 
                      color: getStatusColor(item.status),
                      fontWeight: '500'
                    }}>
                      {item.status}
                    </td>
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
