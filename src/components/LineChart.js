import { Line } from 'react-chartjs-2';
import { } from "chart.js/auto"

const LineChart = ({ timeline }) => {
    const timelineData = timeline.sort((a, b) => new Date(a.date) - new Date(b.date));
    const chartData = {
        labels: timelineData.map(data => data.date),
        datasets: [{
            label: "Speed",
            data: timelineData.map(data => data.speed),
        }]
    }

    return <Line data={chartData} />
}


export default LineChart;