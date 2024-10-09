import React, { useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import anychart from "anychart";
import "anychart/dist/css/anychart-ui.min.css";
import Loader from "../Loader/Loader";
import Navbar from "../NavBar/Navbar";
import StockNavbar from "./StockNavbar";

const IndividualStock = () => {
  const { id } = useParams();
  const name = id.replace(/-/g, " ");
  const location = useLocation();
  const { stockData, companyName, ltp, change } = location.state || {};
  const navigate = useNavigate();

  const handleNavigateToAnalysis = () => {
    navigate(`/stock-analysis/${id}`, {
      state: { stockData, companyName, ltp, change },
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const container = document.getElementById("chartContainer");

    if (container && stockData) {
      // Create chart instance
      const chart = anychart.stock();
      chart.container(container);

      // Create data table on loaded data
      const dataTable = anychart.data.table("x");

      // Convert the data to the format expected by AnyChart
      const formattedData = stockData.map((item) => ({
        x: item.Date, // Use Date as the x value
        close: item.Close, // Use Close price for the line chart
      }));

      dataTable.addData(formattedData); // Add the formatted data

      // Map loaded data for the line series
      const mapping = dataTable.mapAs({
        value: "close", // Map 'close' price to the line chart
      });

      // Create the first plot on the chart
      const plot = chart.plot(0);
      plot.yGrid(true).xGrid(true).yMinorGrid(true).xMinorGrid(true);

      // Create line series and customize the stroke (color, thickness)
      const series = plot.line(mapping).name("LTP");
      series.legendItem().iconType("line");

      // Change the color of the line
      series.stroke("#28a745", 3);

      // Create scroller series with mapped data
      chart.scroller().line(mapping);

      // Create and initialize range picker
      const rangePicker = anychart.ui.rangePicker();
      rangePicker.render(chart);

      // Create and initialize range selector
      const rangeSelector = anychart.ui.rangeSelector();
      rangeSelector.render(chart);

      // Set chart title
      chart.title(`${name.toUpperCase()}`);

      // Draw chart
      chart.draw();

      // Cleanup function
      return () => {
        if (container) {
          container.innerHTML = ""; // Clear chart container on unmount
        }
      };
    }
  }, [id, stockData]); // Add stockData to dependencies

  // Check if stockData is available, otherwise show loader
  if (!stockData) {
    return <Loader />; // Show the loader while fetching data
  }

  return (
    <div className="bg-gray-100">
      <Navbar />
      <StockNavbar companyName={companyName} ltp={ltp} change={change} />
      <div className="p-6 mx-4 my-3 shadow-2xl bg-white rounded-lg">
        {/* Heading with Terminal Button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold ml-6">Share Price Chart</h2>
          <button
            onClick={handleNavigateToAnalysis}
            className="flex items-center justify-center bg-gray-700 text-white py-2 px-4 mr-20 rounded-md hover:bg-gray-900 transition duration-200"
          >
            <i className="fa fa-chart-line mr-2"></i>
            Terminal
          </button>
        </div>

        {/* Chart Container with Tailwind Shadow */}
        <div
          id="chartContainer"
          className="shadow-md rounded-lg bg-white mb-4"
          style={{
            width: "90%",
            height: "700px",
            margin: "0 auto",
            border: "1px solid #ddd",
          }}
        />
      </div>
      {/* Section 1: Key Indicators */}
      <div className="p-6 mx-4 my-3 shadow-md bg-white rounded-lg hover:shadow-xl transition-shadow duration-200">
        <h3 className="text-2xl font-bold mb-2">Key Indicators</h3>
        <p>Today's low/high: ₹2,763.55 / ₹2,834.70</p>
        <p>52-week low/high: ₹2,220.30 / ₹3,217.60</p>
        <p>Circuit range: ₹2,495.74 / ₹3,050.36</p>
        <p>Market cap: ₹18,76,251 Cr</p>
        <p>PE ratio (TTM): 26.95</p>
        <p>Sector PE: 19.94</p>
        <p>ROE: 10.42%</p>
        <p>ROCE: 11.87%</p>
        <p>Basic EPS (TTM): ₹102.90</p>
        <p>Debt to equity: 0.41</p>
        <p>Dividend Yield: 0.36%</p>
      </div>

      {/* Section 2: Returns Calculator */}
      <div className="p-6 mx-4 my-3 shadow-md bg-white rounded-lg hover:shadow-xl transition-shadow duration-200">
        <h3 className="text-2xl font-bold mb-2">Returns Calculator</h3>
        <p>Investment period: 5 Oct 2023 - 5 Oct 2024</p>
        <p>Total investment: ₹10,000</p>
        <p>Profit: + ₹1,983</p>
        <p>Dividends: + ₹50</p>
        <p>Total corpus: ₹12,033</p>
        <p>Absolute returns: 20.33%</p>
      </div>

      {/* Section 3: Financials */}
      <div className="p-6 mx-4 my-3 shadow-md bg-white rounded-lg hover:shadow-xl transition-shadow duration-200">
        <h3 className="text-2xl font-bold mb-2">Financials</h3>
        <p>Operating Revenue: ₹9,01,064 Cr (YoY +2.65%)</p>
        <p>EBITDA: ₹1,78,290 Cr (YoY +15.85%)</p>
        <p>Profit Before Tax: ₹1,04,340 Cr (YoY +10.97%)</p>
        <p>Profit After Tax: ₹78,633 Cr (YoY +6.17%)</p>
      </div>

      {/* Section 4: Shareholding */}
      <div className="p-6 mx-4 my-3 shadow-md bg-white rounded-lg hover:shadow-xl transition-shadow duration-200">
        <h3 className="text-2xl font-bold mb-2">Shareholding</h3>
        <p>Promoters: 50.33%</p>
        <p>FII: 21.75%</p>
        <p>DII: 17.42%</p>
        <p>Retail & others: 10.5%</p>
      </div>

      {/* Section 5: Peer Comparison */}
      <div className="p-6 mx-4 my-3 shadow-md bg-white rounded-lg hover:shadow-xl transition-shadow duration-200">
        <h3 className="text-2xl font-bold mb-2">Peer Comparison</h3>
        <p>
          Reliance Industries Ltd.: Market cap ₹18,76,217 Cr | PE 26.95 | ROE
          10.42%
        </p>
        <p>
          Indian Oil Corporation Ltd.: Market cap ₹2,38,649 Cr | PE 5.71 | ROE
          25.76%
        </p>
        <p>
          Bharat Petroleum Corporation Ltd.: Market cap ₹1,47,509 Cr | PE 5.50 |
          ROE 39.94%
        </p>
      </div>

      {/* Section 6: About Company */}
      <div className="p-6 mx-4 my-3 shadow-md bg-white rounded-lg hover:shadow-xl transition-shadow duration-200">
        <h3 className="text-2xl font-bold mb-2">
          About Reliance Industries Ltd.
        </h3>
        <p>
          Reliance Industries Ltd. is a private sector enterprise in India and
          operates in the Refineries sector...
        </p>
        <p>
          The company was established in 1973 with a market cap of ₹18,76,251.3
          Cr as of 06 Oct 2024.
        </p>
      </div>

      {/* Section 7: News */}
      <div className="p-6 mx-4 my-3 shadow-md bg-white rounded-lg hover:shadow-xl transition-shadow duration-200">
        <h3 className="text-2xl font-bold mb-2">News</h3>
        <p>
          04 Oct 2024: Share market update: Most active stocks of the day in
          terms of traded value.
        </p>
      </div>
    </div>
  );
};

export default IndividualStock;
