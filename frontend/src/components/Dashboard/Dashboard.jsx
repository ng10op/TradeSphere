import React, { useEffect, useState } from "react";
import Navbar from "./Navbar"; // Importing Navbar
import Sidebar from "../Sidebar"; // Importing Sidebar
import Charts from "./Chart";
import Papa from "papaparse";

import { Link } from "react-router-dom"; // Import Link for navigation

function Dashboard() {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Fetch the CSV file and parse it using PapaParse
    Papa.parse("/stockData.csv", {
      download: true,
      header: true,
      complete: (result) => {
        setStockData(result.data);
      },
    });
  }, []);

  // Sample stock market data
  //   const stockData = Array.from({ length: 10 }, () => ({
  //     company: "Reliance Industries Ltd.",
  //     ltp: "2,995.90",
  //     returnPercentage: "+0.27",
  //     marketCap: "20,27,032",
  //     highLow: "3,217.60 / 2,220.30",
  //     volume: "94,09,499",
  //   }));

  // Sample data for Most Bought stocks and Stocks in News
  const mostBoughtStocks = [
    {
      name: "Reliance Industries Ltd.",
      ltp: "2,995.90",
      logo: "/images/Industries/Reliance_Industries_Logo.png",
    },
    {
      name: "Tata Consultancy Services",
      ltp: "3,200.10",
      logo: "/images/Industries/TCS.png",
    },
  ];

  const stocksInNews = [
    {
      name: "HDFC Bank",
      news: "Announced Q2 results, profits up by 15%.",
      logo: "/images/Industries/HDFC.png",
    },
    {
      name: "Infosys",
      news: "To invest 17Cr in spacetech startup GalaxEye.",
      logo: "/images/Industries/Infosys.png",
    },
  ];

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100 ml-64">
        <Navbar />
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-4 mt-4">
            {/* Sample data cards */}
            {[
              {
                title: "Total Stocks",
                value: "350",
                trend: "up",
                diff: 5,
                icon: "fa-chart-line",
                bgColor: "bg-blue-500",
              },
              {
                title: "Nifty 50",
                value: "₹26,178.95",
                trend: "up",
                diff: 4,
                icon: "fa-indian-rupee-sign",
                bgColor: "bg-green-500",
              },
              {
                title: "Market Volatility",
                value: "12%",
                trend: "down",
                diff: 3,
                icon: "fa-signal",
                bgColor: "bg-yellow-500",
              },
              {
                title: "Market Capitalization",
                value: "5.5 Trillion",
                trend: "up",
                diff: 36,
                icon: "fa-building",
                bgColor: "bg-red-500",
              },
            ].map((item, index) => (
              <div
                className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105"
                key={index}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-600 text-sm">{item.title}</p>
                    <h4 className="text-xl font-semibold text-gray-800">
                      {item.value}
                    </h4>
                    {item.diff && (
                      <div className="flex items-center mt-2">
                        <i
                          className={`fas ${
                            item.trend === "up"
                              ? "fa-arrow-up text-green-500"
                              : "fa-arrow-down text-red-500"
                          }`}
                        ></i>
                        <span
                          className={`ml-1 ${
                            item.trend === "up"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {item.diff}%
                        </span>
                        <span className="text-gray-400 ml-1 text-xs">
                          Since last month
                        </span>
                      </div>
                    )}
                  </div>
                  <div
                    className={`w-14 h-14 flex justify-center items-center rounded-full ${item.bgColor}`}
                  >
                    <i className={`fas ${item.icon} text-white text-2xl`}></i>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Most Bought Stocks Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
            {/* Most Bought on TradeSphere Section */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  Most Bought on TradeSphere
                </h2>
                <Link
                  to="/stocks"
                  className="text-blue-500 hover:text-blue-700 font-semibold flex items-center"
                >
                  <i class="fa-solid fa-arrow-trend-up mr-2"></i>
                  Top Stocks
                </Link>
              </div>
              {mostBoughtStocks.map((stock, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between mb-2 p-4 border rounded-lg shadow-md"
                >
                  <img
                    src={stock.logo} // Assuming logo paths are provided in mostBoughtStocks array
                    alt={`${stock.name} Logo`}
                    className="w-16 h-12"
                  />
                  <div className="flex flex-col">
                    <span className="text-gray-800 font-semibold">
                      {stock.name}
                    </span>
                    <span className="text-gray-600">{stock.ltp}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Stocks in News Section */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Stocks in News</h2>
                <Link
                  to="/stocks"
                  className="text-blue-500 hover:text-blue-700 font-semibold flex items-center"
                >
                  <i className="fas fa-newspaper mr-2"></i>
                  News
                </Link>
              </div>
              {stocksInNews.map((newsItem, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between mb-2 p-4 border rounded-lg shadow-md"
                >
                  <img
                    src={newsItem.logo} // Assuming logo paths are provided in stocksInNews array
                    alt={`${newsItem.name} Logo`}
                    className="w-8 h-8"
                  />
                  <div className="flex flex-col">
                    <span className="text-gray-800 font-semibold">
                      {newsItem.name}
                    </span>
                    <span className="text-gray-600">{newsItem.news}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Charts />

          {/* Stock Market Data Table */}
          <div className="bg-white shadow-lg rounded-lg p-6 mt-4">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Stock Market Data
            </h2>
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-700 text-sm ">
                  <th className="py-4 px-6 border">Company</th>
                  <th className="py-4 px-6 border">LTP (₹)</th>
                  <th className="py-4 px-6 border">Change %</th>
                  <th className="py-4 px-6 border">Volume</th>
                  <th className="py-4 px-6 border">Market Cap (Cr)</th>
                  <th className="py-4 px-6 border">1M Returns</th>
                </tr>
              </thead>
              <tbody>
                {stockData.slice(0, 10).map((data, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-100 transition-colors"
                  >
                    <td className="py-4 px-6 border">{data.Name || "N/A"}</td>
                    <td className="py-4 px-6 border">{data.LTP || "N/A"}</td>
                    <td
                      className={`py-4 px-6 border ${
                        parseFloat(data["Change %"]) > 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {data["Change %"] || "N/A"}
                    </td>
                    <td className="py-4 px-6 border">{data.Volume || "N/A"}</td>
                    <td className="py-4 px-6 border">
                      {data["Market Cap (Cr.)"] || "N/A"}
                    </td>
                    <td
                      className={`py-4 px-6 border ${
                        parseFloat(data["1M Returns"]) > 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {data["1M Returns"] || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* View All Link */}
            <div className="flex justify-end mt-4">
              <Link
                to="/stocks"
                className="text-blue-500 hover:text-blue-700 font-semibold"
              >
                View All →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
