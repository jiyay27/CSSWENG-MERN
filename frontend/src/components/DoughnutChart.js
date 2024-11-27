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

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);

let chartInstance = null;

const DoughnutChart = ({ data }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (chartInstance) {
      chartInstance.destroy();
    }
    chartInstance = null;

    const fetchData = async () => {
      try {
        if (!data || !Array.isArray(data.datasets) || data.datasets.length === 0 || !Array.isArray(data.datasets[0].data) || data.datasets[0].data.length === 0) {
          console.warn("No valid data provided");
          setChartData(null);
          return;
        }

        setChartData(data);
      } catch (error) {
        console.error("Error processing data:", error);
        setChartData(null);
      }
    };

    fetchData();
  }, [data]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels:{
          font: {
            family: 'Arial',  
            size: 14,
          },
          generateLabels: (chart) => {
            if (!chart || !chart.data || !Array.isArray(chart.data.labels) || chart.data.labels.length === 0) {
              return [];
            }
            
            const labels = chart.data.labels;
            const datasets = chart.data.datasets;

            return labels.map((label, index) => {
              const count = datasets[0].data[index];
              return {
                text: `${label}  ${count}`,
                fillStyle: datasets[0].backgroundColor[index],
                strokeStyle: "#ffffff",
                lineWidth: 2,
                fontColor: "#ffffff"
              };
            });
          },
        },
        borderWidth:1
      },
      title: {
        display: true,
        text: " "
      }
    }
  };

  const renderChart = () => {
    if (!chartInstance && chartData) {
      try {
        chartInstance = new ChartJS(document.getElementById('doughnut-chart'), {
          type: 'doughnut',
          data: chartData,
          options: options
        });
      } catch (error) {
        console.error("Error rendering chart:", error);
      }
    }
  };

  useEffect(renderChart, [chartData]);

  return (
    <div>
      {chartData ? (
        <div style={{ width: '400px', height: '300px' }}>
          <canvas id="doughnut-chart"></canvas>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default DoughnutChart;

/*

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
                const response = await fetch("http://localhost:5000/api/items");
                const items = await response.json();
    
                
                const labels = items.map(item => item.category);
                const data = items.map(item => item.quantity);

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: "Current Stock",
                            data: data,
                            borderWidth: 4,
                        }
                    ]
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "right",
                labels:{
                    font: {
                        family: 'Arial',  
                        size: 14,
                    },
                    generateLabels: (chart) => {
                        const labels = chart.data.labels;
                        const datasets = chart.data.datasets;
    
                        return labels.map((label, index) => {
                            const count = datasets[0].data[index];
                            return {
                                text: `${label}  ${count}`,
                                fillStyle: datasets[0].backgroundColor[index],
                                strokeStyle: "#ffffff",
                                lineWidth: 2,
                                fontColor: "#ffffff"
                            };
                        });
                    },
                },
                borderWidth:1
            },
            title: {
                display: true,
                text: " "
            }
        }
    };

    return chartData ? (
        <div style={{ width: '400px', height: '300px' }}>
            <Doughnut options={options} data={chartData} />
        </div>
    ) : (
        <div>
            Error Loading Data....
        </div>
    );
};

export default DoughnutChart;

*/