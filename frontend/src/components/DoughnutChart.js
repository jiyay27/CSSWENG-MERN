import React, { useState, useEffect } from 'react';
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import config from '../config';

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);

const DoughnutChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${config.API_URL}/api/items`);
        const items = await response.json();

        // Group items by category and sum their quantities
        const categoryData = items.reduce((acc, item) => {
          if (!acc[item.category]) {
            acc[item.category] = 0;
          }
          acc[item.category] += item.quantity || 0;
          return acc;
        }, {});

        const labels = Object.keys(categoryData);
        const data = Object.values(categoryData);

        // Generate random colors for each category
        const backgroundColor = labels.map(() => 
          `hsl(${Math.random() * 360}, 70%, 50%)`
        );

        setChartData({
          labels: labels,
          datasets: [{
            data: data,
            backgroundColor: getChartColors(labels.length),
            borderWidth: 2,
            borderColor: '#2C3E50'
          }]
        });
      } catch (error) {
        console.error('Error fetching chart data:', error);
        setChartData(null);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: '#ffffff',
          font: {
            size: 12,
            family: 'Arial, sans-serif' // Match website font
          },
          padding: 15,
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        bodyFont: {
          family: 'Arial, sans-serif'
        },
        titleFont: {
          family: 'Arial, sans-serif'
        },
        padding: 12,
        displayColors: true,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1
      }
    },
    elements: {
      arc: {
        borderWidth: 2,
        borderColor: '#2C3E50', // Match website background
        hoverBorderColor: '#ffffff'
      }
    },
    layout: {
      padding: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10
      }
    }
  };

  const getChartColors = (count) => {
    const baseColors = [
      'hsl(210, 29%, 29%)',  // Darker shade
      'hsl(210, 29%, 39%)',  // Base color
      'hsl(210, 29%, 49%)',  // Lighter shade
      'hsl(210, 29%, 59%)',  // Even lighter
      'hsl(210, 29%, 69%)'   // Lightest
    ];
    
    return Array(count).fill().map((_, i) => 
      baseColors[i] || `hsl(210, ${29 + (i * 5)}%, ${29 + (i * 10)}%)`
    );
  };

  return (
    <div style={{ width: '100%', height: '300px' }}>
      {chartData ? (
        <Doughnut data={chartData} options={options} />
      ) : (
        <div style={{ color: '#ffffff', textAlign: 'center', paddingTop: '120px' }}>
          Loading inventory data...
        </div>
      )}
    </div>
  );
};

export default DoughnutChart;