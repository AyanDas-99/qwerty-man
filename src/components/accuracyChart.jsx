import { Line } from "react-chartjs-2";
import {} from "chart.js/auto";

const AccuracyChart = ({ timeline }) => {
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
  timelineData.map((e) => console.log(e.date));
  const chartData = {
    labels: timelineData.map((data) => data.date),
    datasets: [
      {
        label: "Accuracy",
        data: timelineData.map((data) => data.accuracy),
      },
    ],
  };

  const options = {
    color: "white",
  };
  return <Line data={chartData} className="chart" options={options} />;
};

export default AccuracyChart;
