import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    Legend,
    Tooltip,
    ArcElement
} from "chart.js";

ChartJS.register(
    Legend,
    Tootltip,
    ArcElement
);

export const DoughnutChart = () => {
    const options = {
        responsive:true,
        plugins:{
            legend:{
                position:"bottom",
            },
            title: {
                display:true,
                text:"Current Stock"
            }
        }
    }
    const data = {
        labels: ["Router","Ethernet Cable","Switch","Mesh"],
        datasets:[
            {label:"Current Stock",
             data: [30,50,0,20],
             backgroundColor:[
                // add colors
             ]
            }
        ],
    }

    return <Doughnut options={options} data={data}/>;
};