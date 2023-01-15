import { Line } from 'react-chartjs-2';
import { } from "chart.js/auto"
import { useState, useEffect } from 'react';

const LineChart = ({ timeline }) => {
    const [chartData, setChartdata] = useState(null)
    const [userdata, setUserdata] = useState([]);

    console.log(userdata)
    useEffect(() => {
        if (timeline.length !== 0) {
            setUserdata(timeline.sort((a, b) => new Date(a.date) - new Date(b.date)));
            setChartdata({
                labels: userdata.map(data => data.date),
                datasets: [{
                    label: "speed",
                    data: userdata.map(data => data.speed),
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