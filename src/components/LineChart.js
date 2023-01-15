import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { } from "chart.js/auto"

const LineChart = ({ chartData }) => {
    return <div style={{ width: 500 }}>
        <Line data={chartData} />
    </div>
}

export default LineChart;