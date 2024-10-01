import React from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const Charts = () => {
  const sectorData = {
    labels: ["Technology", "Finance", "Healthcare", "Energy", "Consumer Goods"],
    datasets: [
      {
        data: [25, 30, 15, 20, 10],
        backgroundColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(153, 102, 255, 1)",
        ],
      },
    ],
  };

  const sectorOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Sector Distribution of Stocks",
      },
    },
  };

  const labels = ["Nifty", "Sensex", "Bank Nifty", "Fin Nifty"];
  const stockPrices = [18000, 60000, 40000, 20000];

  const barData = {
    labels: labels,
    datasets: [
      {
        data: stockPrices,
        backgroundColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Prices of Indices",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center space-x-8 space-y-4 md:space-y-0">
      {/* Bar Chart with Heading and Labels */}
      <div className="bg-white shadow-md rounded-lg p-6 mt-4 w-full md:w-1/2 h-96 hover:shadow-xl transition-shadow duration-200">
        {/* Set height to h-96 for equal alignment */}
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Indices</h2>
        <div className="flex flex-row h-full">
          <div className="w-3/4 h-full">
            {/* Ensure chart fills the available height */}
            <Bar data={barData} options={barOptions} className="h-full" />
          </div>
          {/* Bar chart labels with color */}
          <div className="flex flex-col justify-center pl-4">
            {labels.map((label, index) => (
              <div key={index} className="flex items-center mb-2">
                <span
                  className="w-4 h-4 inline-block mr-2"
                  style={{
                    backgroundColor: barData.datasets[0].backgroundColor[index],
                  }}
                ></span>
                <span className="text-gray-700">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pie Chart with Heading and Labels */}
      <div className="bg-white shadow-md rounded-lg p-6 mt-4 w-full md:w-1/2 h-96 flex flex-row hover:shadow-xl transition-shadow duration-200">
        {/* Set height to h-96 for equal alignment */}
        <div className="flex flex-col justify-center pr-4">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Sector Distribution
          </h2>
          <ul className="list-none">
            {sectorData.labels.map((label, index) => (
              <li key={index} className="flex items-center mb-2">
                <span
                  className="w-4 h-4 inline-block mr-2"
                  style={{
                    backgroundColor:
                      sectorData.datasets[0].backgroundColor[index],
                  }}
                ></span>
                <span className="text-gray-700">{label}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-3/4 h-full">
          {/* Ensure chart fills the available height */}
          <Pie data={sectorData} options={sectorOptions} className="h-full" />
        </div>
      </div>
    </div>
  );
};

export default Charts;
