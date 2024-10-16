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
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "right",
                labels:{color: "#FFFFFF"},
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

    return <div style={{ width: '400px', height: '300px' }}><Doughnut options={options} data={data} /></div>;
};

export default DoughnutChart;