import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";
import Sidebar from "../SideBar/Sidebar";
import { useAuth } from "../Context/AuthContext";
import Loader from "../Loader/Loader";

const Stocks = () => {
  const { token } = useAuth();
  const [stockData, setStockData] = useState([]);
  const [visibleRows, setVisibleRows] = useState(20);
  const [randomStocks, setRandomStocks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    Papa.parse("/stockDataET.csv", {
      download: true,
      header: true,
      complete: (result) => {
        setStockData(result.data);
        selectRandomStocks(result.data);
      },
    });
  }, []);

  const selectRandomStocks = (data) => {
    const numberOfStocksToSelect = 20;
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
    setVisibleRows((prev) => prev + 20);
  };

  const filteredStockData = stockData.filter(
    (stock) =>
      stock.Company &&
      stock.Company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // const handleCompanyClick = async (companyName, ltp, change) => {
  //   setIsLoading(true); // Set loading state to true
  //   try {
  //     const response = await fetch("http://localhost:8000/api/stock/history", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({ companyName }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const data = await response.json();

  //     const formattedCompanyName = companyName.replace(/\s+/g, "-");
  //     navigate(`/stock/${formattedCompanyName}`, {
  //       state: { stockData: data, companyName, ltp, change },
  //     });
  //   } catch (error) {
  //     console.error("Error fetching stock data:", error);
  //   } finally {
  //     setIsLoading(false); // Reset loading state
  //   }
  // };

  const handleCompanyClick = async (companyName, ltp, change) => {
    setIsLoading(true); // Set loading state to true
    try {
      // Fetch stock history data
      const stockHistoryResponse = await fetch(
        "http://localhost:8000/api/stock/history",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ companyName }),
        }
      );

      if (!stockHistoryResponse.ok) {
        throw new Error("Error fetching stock history");
      }

      const stockHistoryData = await stockHistoryResponse.json();

      // Fetch page data
      const pageResponse = await fetch("http://localhost:8000/api/stock/page", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ companyName }),
      });

      if (!pageResponse.ok) {
        throw new Error("Error fetching page data");
      }

      const pageData = await pageResponse.json();

      // Navigate to stock page with both data sets
      const formattedCompanyName = companyName.replace(/\s+/g, "-");
      console.log(stockData);
      console.log(pageData);
      navigate(`/stock/${formattedCompanyName}`, {
        state: {
          stockData: stockHistoryData,
          pageData,
          companyName,
          ltp,
          change,
        },
      });
    } catch (error) {
      console.error("Error fetching stock data or page data:", error);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  if (isLoading) {
    return <Loader />; // Show loader if loading
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 ml-64">
        <div className="overflow-hidden whitespace-nowrap border-b border-gray-300">
          <marquee
            className="py-2 text-lg"
            scrollamount="10"
            behavior="scroll"
            direction="left"
          >
            <span className="flex">
              {randomStocks.map((stock, index) => (
                <span key={index} className="mx-4">
                  {stock.Company || "N/A"} {stock["LTP (₹)"] || "N/A"} (
                  <span
                    className={`${
                      parseFloat(stock["1D Return %"]) > 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {stock["1D Return %"] || "N/A"}{" "}
                    {parseFloat(stock["1D Return %"]) > 0 ? "↑" : "↓"}
                  </span>
                  )
                </span>
              ))}
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

        <div className="flex items-center justify-between mb-4 mt-4">
          <h1 className="text-2xl font-bold">All Stocks Listed on NSE & BSE</h1>
          <div className="relative w-full max-w-[600px]">
            <input
              type="search"
              placeholder="Search Stocks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full py-2 pl-10 border rounded-lg focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <i className="fas fa-search w-5 h-5 text-gray-400"></i>
            </div>
          </div>
          <div className="flex justify-center mr-8">
            <button className="bg-[#4f46e5] text-white px-4 py-2 rounded-lg hover:bg-[#3730a3] transform hover:scale-105 transition duration-200">
              Update Data
            </button>
          </div>
        </div>

        <div className="overflow-auto max-h-[720px] max-w-[1380px] border rounded-lg">
          <div className="min-w-full">
            <table className="min-w-full table-auto whitespace-nowrap">
              <thead>
                <tr className="bg-gray-300 text-black text-sm">
                  <th className="py-4 px-6 border">Company</th>
                  <th className="py-4 px-6 border">LTP (₹)</th>
                  <th className="py-4 px-6 border">1D Return %</th>
                  <th className="py-4 px-6 border">Market Cap (Cr)</th>
                  <th className="py-4 px-6 border">52W High / Low (₹)</th>
                  <th className="py-4 px-6 border">Volume</th>
                </tr>
              </thead>
              <tbody>
                {filteredStockData.length > 0 ? (
                  filteredStockData.slice(0, visibleRows).map((data, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-100 transition-colors"
                    >
                      <td
                        className="py-4 px-6 border cursor-pointer"
                        onClick={() =>
                          handleCompanyClick(
                            data.Company,
                            data["LTP (₹)"],
                            data["1D Return %"]
                          )
                        }
                      >
                        {data.Company || "N/A"}
                      </td>
                      <td className="py-4 px-6 border">
                        {data["LTP (₹)"] || "N/A"}
                      </td>
                      <td
                        className={`py-4 px-6 border ${
                          parseFloat(data["1D Return %"]) > 0
                            ? "text-green-500"
                            : "text-red-500"
                        }`}
                      >
                        {data["1D Return %"] || "N/A"}
                      </td>
                      <td className="py-4 px-6 border">
                        {data["Market Cap (Cr)"] || "N/A"}
                      </td>
                      <td className="py-4 px-6 border">
                        {data["52W High / Low (₹)"] || "N/A"}
                      </td>
                      <td className="py-4 px-6 border">
                        {data.Volume || "N/A"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-4 text-center">
                      No results found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-between mt-4">
          <span className="text-lg ml-4 font-bold">
            Showing {Math.min(visibleRows, filteredStockData.length)} of{" "}
            {filteredStockData.length} stocks
          </span>
          <div className="flex justify-end mr-8">
            {/* Load more button */}
            {visibleRows < filteredStockData.length && (
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
    </div>
  );
};

export default Stocks;
