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

export const DoughnutChart = () => {
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
            },
            title: {
                display: true,
                text: "Current Stock"
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
                ]
            }
        ]
    };

    return <Doughnut options={options} data={data} />;
};
