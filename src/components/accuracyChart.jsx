import { Line } from 'react-chartjs-2';
import { } from "chart.js/auto"

const AccuracyChart = ({ timeline }) => {
    const timelineData = timeline.sort((a, b) => new Date(a.date) - new Date(b.date));
    const chartData = {
        labels: timelineData.map(data => data.date),
        datasets: [{
            label: "Accuracy",
            data: timelineData.map(data => data.accuracy),
        }]
    }

    const options = {
        color: 'white',
    }
    return <Line data={chartData} className="chart" options={options} />
}


export default AccuracyChart;