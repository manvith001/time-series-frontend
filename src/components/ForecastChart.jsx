import React from 'react';
import { Line, Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import moment from "moment";

export default function ForecastChart({ data }) {
  // Define labels first
  const labels = data.map(d => moment(d.ds).format("MMM DD, HH:mm"));

  const lineChartData = {
    labels,
    datasets: [
      {
        label: "Forecast",
        data: data.map(d => d.yhat),
        borderColor: "blue",
        fill: false
      },
      {
        label: "Lower Bound",
        data: data.map(d => d.yhat_lower),
        borderColor: "red",
        borderDash: [5, 5],
        fill: false
      },
      {
        label: "Upper Bound",
        data: data.map(d => d.yhat_upper),
        borderColor: "green",
        borderDash: [5, 5],
        fill: false
      }
    ]
  };

  const barChartData = {
    labels,
    datasets: [
      {
        label: "Forecast Values",
        data: data.map(d => d.yhat),
        backgroundColor: "rgba(54, 162, 235, 0.5)"
      }
    ]
  };

  return (
    <div>
      
      <Line data={lineChartData} />

      
      <div style={{ marginTop: "2rem" }}>
        <Bar data={barChartData} />
      </div>
    </div>
  );
}
