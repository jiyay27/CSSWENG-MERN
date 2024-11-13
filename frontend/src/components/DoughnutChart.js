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