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
  const { stockData, pageData, companyName, ltp, change } =
    location.state || {};
  const navigate = useNavigate();

  const handleNavigateToAnalysis = () => {
    navigate(`/stock-analysis/${id}`, {
      state: { stockData, pageData, companyName, ltp, change },
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
    <div className="bg-gray-200">
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
        <div
          dangerouslySetInnerHTML={{
            __html: pageData.data.section_1.replace(/\n/g, "<br />"),
          }}
        />{" "}
      </div>

      {/* Section 3: Financials */}
      <div className="p-6 mx-4 my-3 shadow-md bg-white rounded-lg hover:shadow-xl transition-shadow duration-200">
        <h3 className="text-2xl font-bold mb-2">Financials</h3>
        <div
          dangerouslySetInnerHTML={{
            __html: pageData.data.section_3.replace(/\n/g, "<br />"),
          }}
        />{" "}
      </div>

      {/* Section 4: Shareholding */}
      <div className="p-6 mx-4 my-3 shadow-md bg-white rounded-lg hover:shadow-xl transition-shadow duration-200">
        <h3 className="text-2xl font-bold mb-2">Shareholding</h3>
        <div
          dangerouslySetInnerHTML={{
            __html: pageData.data.section_4.replace(/\n/g, "<br />"),
          }}
        />{" "}
      </div>

      {/* Section 5: Peer Comparison */}
      <div className="p-6 mx-4 my-3 shadow-md bg-white rounded-lg hover:shadow-xl transition-shadow duration-200">
        <h3 className="text-2xl font-bold mb-2">Peer Comparison</h3>
        <div
          dangerouslySetInnerHTML={{
            __html: pageData.data.section_5.replace(/\n/g, "<br />"),
          }}
        />{" "}
      </div>

      {/* Section 6: About Company */}
      <div className="p-6 mx-4 my-3 shadow-md bg-white rounded-lg hover:shadow-xl transition-shadow duration-200">
        <h3 className="text-2xl font-bold mb-2">
          About Reliance Industries Ltd.
        </h3>
        <div
          dangerouslySetInnerHTML={{
            __html: pageData.data.section_6.replace(/\n/g, "<br />"),
          }}
        />{" "}
      </div>

      {/* Section 7: News */}
      <div className="p-6 mx-4 my-3 shadow-md bg-white rounded-lg hover:shadow-xl transition-shadow duration-200">
        <h3 className="text-2xl font-bold mb-2">News</h3>
        <div
          dangerouslySetInnerHTML={{
            __html: pageData.data.section_7.replace(/\n/g, "<br />"),
          }}
        />
      </div>
    </div>
  );
};

export default IndividualStock;
