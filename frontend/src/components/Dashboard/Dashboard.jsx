import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../NavBar/Navbar";
import Sidebar from "../SideBar/Sidebar";
import Charts from "./Chart";
import { useAuth } from "../Context/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const mostBoughtStocks = [
    {
      name: "Reliance Industries Ltd.",
      logo: "/images/Industries/Reliance_Industries_Logo.png",
    },
    {
      name: "Tata Consultancy Services",
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
            {[
              {
                title: "Total Stocks",
                value: "360",
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
                className="bg-white shadow-md rounded-lg p-6 transition-transform transform hover:scale-105 hover:shadow-xl transition-shadow duration-200"
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-4">
            <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  Most Bought on TradeSphere
                </h2>
                <Link
                  to="/stocks"
                  className="text-blue-500 hover:text-blue-700 font-semibold flex items-center"
                >
                  <i className="fa-solid fa-arrow-trend-up mr-2"></i>
                  Top Stocks
                </Link>
              </div>
              {mostBoughtStocks.map((stock, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between mb-2 p-4 border rounded-lg shadow-md"
                >
                  <img
                    src={stock.logo}
                    alt={`${stock.name} Logo`}
                    className="w-16 h-12"
                  />
                  <div className="flex flex-col">
                    <span className="text-gray-800 font-semibold">
                      {stock.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Stocks in News</h2>
                <Link
                  to="https://economictimes.indiatimes.com/"
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
                    src={newsItem.logo}
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

          <div className="bg-white shadow-md rounded-lg p-6 mt-4 hover:shadow-xl transition-shadow duration-200">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Stock Market Data
            </h2>
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-700 text-sm ">
                  <th className="py-4 px-6 border">Company</th>
                  <th className="py-4 px-6 border">LTP (₹)</th>
                  <th className="py-4 px-6 border">1D Return %</th>
                  <th className="py-4 px-6 border">Market Cap (Cr)</th>
                  <th className="py-4 px-6 border">Volume</th>
                </tr>
              </thead>
              <tbody>
                {user.stocks.slice(0, 10).map((data, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-100 transition-colors"
                  >
                    <td className="py-4 px-6 border">
                      {data.companyName || "N/A"}
                    </td>
                    <td className="py-4 px-6 border">{data.ltp || "N/A"}</td>
                    <td
                      className={`py-4 px-6 border ${
                        parseFloat(data.oneDReturn) > 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {data.oneDReturn || "N/A"}
                    </td>
                    <td className="py-4 px-6 border">
                      {data.marketCap || "N/A"}
                    </td>
                    <td className="py-4 px-6 border">{data.volume || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-end mt-4 mr-4">
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
