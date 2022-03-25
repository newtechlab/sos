import { getDaysOfMonthNumbers } from "../data/DaysOfMonth";

export const chartOptions = {
    plugins: {
      title: {
        display: false,
        text: 'Chart.js Bar Chart - Stacked',
      },
    },
    // responsive: true,
    maintainAspectRatio : false,
    scales: {
      x: {
        stacked: true,
        gridLines: {
            display:false
        }
      },
      y: {
        stacked: true,
        gridLines: {
            display:false
        }
      },
    },
  };

  export const chartLabels = getDaysOfMonthNumbers();

  export const graphDataInitialState = {
    labels: chartLabels,
    datasets: [],
  };