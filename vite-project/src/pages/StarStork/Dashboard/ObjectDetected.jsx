// import React from "react";

// const PieChart = ({ title }) => {
//   return (
//     <div className="bg-zinc-800 p-4 rounded-md">
//       <h3 className="text-white mb-4">{title}</h3>
//       <div className="bg-zinc-700 w-full h-64 rounded-md"></div>
//       <div className="flex justify-center mt-4">
//         <div className="flex items-center mr-4">
//           <div className="bg-yellow-500 w-4 h-4 rounded-full mr-2"></div>
//           <span className="text-white">Completed</span>
//         </div>
//         <div className="flex items-center">
//           <div className="bg-red-500 w-4 h-4 rounded-full mr-2"></div>
//           <span className="text-white">Pending</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PieChart;

import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const ObjectsDetected = () => {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Objects Detected',
        data: [12, 19, 3, 5, 2, 3, 9],
        fill: true, // Set fill to true
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            // This case happens on initial chart load
            return null;
          }

          const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
          gradient.addColorStop(0, '#0f1c17');
          gradient.addColorStop(1, '#2f5244');
          return gradient;
        },
        borderColor: '#00995c',
        borderWidth: 3,
        tension: 0.4,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div className="p-4 bg-neutral-900 text-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg text-neutral-400 font-semibold">Objects Detected</h2>
        <button className="text-sm text-gray-300 hover:text-white">View All</button>
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default ObjectsDetected;


