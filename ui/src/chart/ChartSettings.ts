import { getDaysOfMonthNumbers } from "../data/DaysOfMonth";

export const chartOptions = {
    plugins: {
      title: {
        display: false,
        text: 'Overview',
      },
      legend: {
        display: false,
      },
    },
    // responsive: true,
    maintainAspectRatio : false,
    indexAxis: 'y' as const,
    scales: {
      x: {
        stacked: true,
        grid: {
            display:false,
        }
      },
      y: {
        stacked: true,
        grid: {
            display:false,
        }
      },
    },
  };

  export const PengerUtColour = '#FDBB31';
  export const PengerInnColour = '#81D35B';

  export const chartLabels = getDaysOfMonthNumbers();

  export const graphDataInitialState = {
    labels: chartLabels,
    datasets: [],
  };