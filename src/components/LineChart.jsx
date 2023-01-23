import { Line } from "react-chartjs-2";
import {} from "chart.js/auto";

const LineChart = ({ timeline }) => {
  const timelineData = timeline.sort(
    (a, b) =>
      new Date(
        `${a.date.split("-")[1]}-${a.date.split("-")[0]}-${
          a.date.split("-")[2]
        }`
      ) -
      new Date(
        `${b.date.split("-")[1]}-${b.date.split("-")[0]}-${
          b.date.split("-")[2]
        }`
      )
  );
  const chartData = {
    labels: timelineData.map((data) => data.date),
    datasets: [
      {
        label: "Speed",
        data: timelineData.map((data) => data.speed),
      },
    ],
  };
  const options = {
    color: "white",
  };

  return <Line data={chartData} className="chart" options={options} />;
};

export default LineChart;
