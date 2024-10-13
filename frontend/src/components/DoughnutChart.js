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
    const options = {}
    const data = {
        labels: ["Router","Ethernet Cable","Switch","Mesh"],
        datasets:[
            {label:"Available",
             data: [30,50,0,20],
             backgroundColor:[
                // add colors
             ]
            }
        ],
    }

    return <Doughnut options={options} data={data}/>;
};