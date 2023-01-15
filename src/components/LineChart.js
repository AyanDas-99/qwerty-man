import { Line } from 'react-chartjs-2';
import { } from "chart.js/auto"
import { useState, useEffect } from 'react';

const LineChart = ({ timeline }) => {
    const [chartData, setChartdata] = useState(null)
    useEffect(() => {
        if (timeline.length !== 0) {
            setChartdata({
                labels: timeline.map(data => data.date.split('-')[0]),
                datasets: [{
                    label: "speed",
                    data: timeline.map(data => data.speed),
                }]
            })
        }
    }, [timeline])


    return <div style={{ width: 500 }}>
        {chartData &&
            <Line data={chartData} />
        }
    </div>

}

export default LineChart;