import { Line } from 'react-chartjs-2';
import { } from "chart.js/auto"

const LineChart = ({ timeline }) => {
    console.log(timeline)
    const timelineData = timeline.sort((a, b) => new Date(a.date) - new Date(b.date));
    console.log(timelineData)
    const chartData = {
        labels: timelineData.map(data => data.date),
        datasets: [{
            label: "Speed",
            data: timelineData.map(data => data.speed),
        }]
    }
    const options = {
        color: 'white'
    }

    return <Line data={chartData} className="chart" options={options}/>
}


export default LineChart;