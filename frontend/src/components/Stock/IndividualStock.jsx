import React, { useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom"; // Import useLocation and useNavigate
import anychart from "anychart";
import "anychart/dist/css/anychart-ui.min.css"; // Import AnyChart CSS
import Loader from "../Loader/Loader"; // Import your Loader component

const IndividualStock = () => {
  const { id } = useParams(); // Retrieve the 'id' parameter from the URL
  const name = id.replace(/-/g, " ");
  const location = useLocation(); // Access location object
  const { stockData } = location.state || {}; // Get stockData from state
  const navigate = useNavigate(); // Initialize useNavigate

  const handleNavigateToAnalysis = () => {
    navigate(`/stock-analysis/${id}`, { state: { stockData } });
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
        open: item.Open,
        high: item.High,
        low: item.Low,
        close: item.Close,
      }));

      dataTable.addData(formattedData); // Add the formatted data

      // Map loaded data for the candlestick series
      const mapping = dataTable.mapAs({
        open: "open",
        high: "high",
        low: "low",
        close: "close",
      });

      // Create the first plot on the chart
      const plot = chart.plot(0);
      plot.yGrid(true).xGrid(true).yMinorGrid(true).xMinorGrid(true);

      // Create candlestick series
      const series = plot.candlestick(mapping).name(name.toUpperCase());
      series.legendItem().iconType("rising-falling");

      // Create scroller series with mapped data
      chart.scroller().candlestick(mapping);

      // Create and initialize range picker
      const rangePicker = anychart.ui.rangePicker();
      rangePicker.render(chart);

      // Create and initialize range selector
      const rangeSelector = anychart.ui.rangeSelector();
      rangeSelector.render(chart);

      // Set chart title
      chart.title(`${name.toUpperCase()} Stock Chart`);

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
    <div style={{ padding: "20px" }}>
      <h1>Stock Analysis Dashboard</h1>
      <p>
        This dashboard displays stock charts for various companies. The chart
        below shows data for {name.toUpperCase()}.
      </p>
      <div
        id="chartContainer"
        style={{
          width: "80%",
          height: "700px",
          margin: "0 auto",
          backgroundColor: "#f9f9f9",
          border: "1px solid #ddd",
        }}
      />
      <footer style={{ marginTop: "20px", textAlign: "center" }}>
        <p>Additional content here, such as filters or other information.</p>
        {/* Link to dynamic stock analysis */}
        <button
          onClick={handleNavigateToAnalysis}
          style={{
            textDecoration: "none",
            color: "#007bff",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          Go to {name.toUpperCase()} Analysis
        </button>
      </footer>
    </div>
  );
};

export default IndividualStock;
