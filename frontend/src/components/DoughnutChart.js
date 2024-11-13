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
    
                
                const itemslist = [...new Set(items.map(item => item.category))];
    
    
                const itemstock = itemslist.reduce((acc, category) => {
                    acc[category] = 0;
                    return acc;
                }, {});
    
                items.forEach(item => {
                    if (itemstock[item.category] !== undefined) {
                        itemstock[item.category]++;
                    }
                });
                setChartData({
                    labels: Object.keys(itemstock),
                    datasets: [
                        {
                            label: "Current Stock",
                            data: Object.values(itemstock),
                            backgroundColor: [
                                "#FF6384",
                                "#36A2EB",
                                "#FFCE56",
                                "#4BC0C0"
                            ],
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
                    color: "#ffffff",
                    font: {
                        family: 'Arial',  
                        size: 14,
                        style: 'normal',
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

    const data = {
        labels: ["Router", "Ethernet Cable", "Switch", "Mesh"],
        datasets: [
            {
                label: "Current Stock",
                data: [30, 50, 0, 20],
                backgroundColor: [
                    "#FF6384",  //Router
                    "#36A2EB",  //Ethernet Cable
                    "#FFCE56",  //Switch
                    "#4BC0C0"   //Mesh
                ],
                borderWidth: 4,
            }
        ]
    };

    return chartData ? (
        <div style={{ width: '400px', height: '300px' }}>
            <Doughnut options={options} data={chartData} />
        </div>
    ) : (
        <div style={{ width: '400px', height: '300px' }}>
            <Doughnut options={options} data={data} />
        </div>
    );
};

export default DoughnutChart;