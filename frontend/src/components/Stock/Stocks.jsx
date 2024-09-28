import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import Sidebar from "../Sidebar"; // Assuming you have a Sidebar component

const Stocks = () => {
  const [stockData, setStockData] = useState([]);
  const [visibleRows, setVisibleRows] = useState(20); // Initially show 20 rows
  const [randomStocks, setRandomStocks] = useState([]);

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
        selectRandomStocks(result.data);
      },
    });
  }, []);

  const selectRandomStocks = (data) => {
    const numberOfStocksToSelect = 10;
    const selectedIndices = new Set();

    while (selectedIndices.size < numberOfStocksToSelect) {
      const randomIndex = Math.floor(Math.random() * data.length);
      selectedIndices.add(randomIndex);
    }

    const selectedStocks = Array.from(selectedIndices).map(
      (index) => data[index]
    );
    setRandomStocks(selectedStocks);
  };

  const loadMoreRows = () => {
    setVisibleRows((prev) => prev + 20); // Load 20 more rows
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 p-6 ml-64">
        {/* Marquee for random stocks */}
        <div className="overflow-hidden whitespace-nowrap border-b border-gray-300">
          <marquee
            className="py-2 text-lg"
            scrollamount="10"
            behavior="scroll"
            direction="left"
          >
            {/* Duplicate the content for a seamless effect */}
            <span className="flex">
              {randomStocks.map((stock, index) => (
                <span key={index} className="mx-4">
                  {stock.Name || "N/A"} {stock.LTP || "N/A"} (
                  <span
                    className={`${
                      parseFloat(stock["Change %"]) > 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {stock["Change %"] || "N/A"}{" "}
                    {parseFloat(stock["Change %"]) > 0 ? "↑" : "↓"}
                  </span>
                  )
                </span>
              ))}
              {/* Duplicating the same content for seamless scrolling */}
              {randomStocks.map((stock, index) => (
                <span key={`dup-${index}`} className="mx-4">
                  {stock.Name || "N/A"} {stock.LTP || "N/A"} (
                  <span
                    className={`${
                      parseFloat(stock["Change %"]) > 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {stock["Change %"] || "N/A"}{" "}
                    {parseFloat(stock["Change %"]) > 0 ? "↑" : "↓"}
                  </span>
                  )
                </span>
              ))}
            </span>
          </marquee>
        </div>

        <h1 className="text-2xl font-bold mb-4 mt-4">
          All Stocks Listed on NSE & BSE
        </h1>

        {/* Scrollable div for the table */}
        <div className="overflow-auto max-h-[720px] max-w-[1380px] border rounded-lg ">
          <div className="min-w-full">
            <table className="min-w-full table-auto whitespace-nowrap">
              <thead>
                <tr className="bg-gray-200 text-gray-700 text-sm">
                  <th className="py-4 px-6 border sticky left-0 bg-gray-200 z-10">
                    Company
                  </th>
                  <th className="py-4 px-6 border">LTP (₹)</th>
                  <th className="py-4 px-6 border">Change %</th>
                  <th className="py-4 px-6 border">Volume</th>
                  <th className="py-4 px-6 border">Market Cap (Cr)</th>
                  <th className="py-4 px-6 border">PE Ratio</th>
                  <th className="py-4 px-6 border">Industry PE</th>
                  <th className="py-4 px-6 border">52W High</th>
                  <th className="py-4 px-6 border">52W Low</th>
                  <th className="py-4 px-6 border">1M Returns</th>
                  <th className="py-4 px-6 border">3M Returns</th>
                  <th className="py-4 px-6 border">1 Yr Returns</th>
                  <th className="py-4 px-6 border">3 Yr Returns</th>
                  <th className="py-4 px-6 border">5 Yr Returns</th>
                  <th className="py-4 px-6 border">PB Ratio</th>
                  <th className="py-4 px-6 border">Dividend</th>
                  <th className="py-4 px-6 border">ROE</th>
                  <th className="py-4 px-6 border">ROCE</th>
                  <th className="py-4 px-6 border">EPS</th>
                  <th className="py-4 px-6 border">50 DMA</th>
                  <th className="py-4 px-6 border">200 DMA</th>
                  <th className="py-4 px-6 border">RSI</th>
                </tr>
              </thead>
              <tbody>
                {stockData.slice(0, visibleRows).map((data, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-100 transition-colors"
                  >
                    <td className="py-4 px-6 border sticky left-0 bg-white z-0">
                      {data.Name || "N/A"}
                    </td>
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
                    <td className="py-4 px-6 border">
                      {data["PE Ratio"] || "N/A"}
                    </td>
                    <td className="py-4 px-6 border">
                      {data["Industry PE"] || "N/A"}
                    </td>
                    <td className="py-4 px-6 border">
                      {data["52W High"] || "N/A"}
                    </td>
                    <td className="py-4 px-6 border">
                      {data["52W Low"] || "N/A"}
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
                    <td
                      className={`py-4 px-6 border ${
                        parseFloat(data["3M Returns"]) > 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {data["3M Returns"] || "N/A"}
                    </td>
                    <td
                      className={`py-4 px-6 border ${
                        parseFloat(data["1 Yr Returns"]) > 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {data["1 Yr Returns"] || "N/A"}
                    </td>
                    <td
                      className={`py-4 px-6 border ${
                        parseFloat(data["3 Yr Returns"]) > 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {data["3 Yr Returns"] || "N/A"}
                    </td>
                    <td
                      className={`py-4 px-6 border ${
                        parseFloat(data["5 Yr Returns"]) > 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {data["5 Yr Returns"] || "N/A"}
                    </td>
                    <td className="py-4 px-6 border">
                      {data["PB Ratio"] || "N/A"}
                    </td>
                    <td className="py-4 px-6 border">
                      {data.Dividend || "N/A"}
                    </td>
                    <td
                      className={`py-4 px-6 border ${
                        parseFloat(data.ROE) > 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {data.ROE || "N/A"}
                    </td>
                    <td
                      className={`py-4 px-6 border ${
                        parseFloat(data.ROCE) > 0
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {data.ROCE || "N/A"}
                    </td>
                    <td className="py-4 px-6 border">{data.EPS || "N/A"}</td>
                    <td className="py-4 px-6 border">
                      {data["50 DMA"] || "N/A"}
                    </td>
                    <td className="py-4 px-6 border">
                      {data["200 DMA"] || "N/A"}
                    </td>
                    <td className="py-4 px-6 border">{data.RSI || "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Load more button outside scrollable area */}
        <div className="flex justify-end mt-4 mr-10">
          {visibleRows < stockData.length - 1 && (
            <button
              onClick={loadMoreRows}
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              View More →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stocks;
