import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom"; // Import Link and useParams
import anychart from "anychart";
import "anychart/dist/css/anychart-ui.min.css"; // Import AnyChart CSS

const IndividualStock = () => {
  const { id } = useParams(); // Retrieve the 'name' parameter from the URL

  useEffect(() => {
    // Get the chart container element
    const container = document.getElementById("chartContainer");

    if (container) {
      // Create chart instance
      const chart = anychart.stock();
      chart.container(container);

      // Load and initialize chart data
      anychart.data.loadCsvFile("/RELIANCE.csv", (data) => {
        // Use dynamic stock name from URL
        // Create data table on loaded data
        const dataTable = anychart.data.table();
        dataTable.addData(data);

        // Map loaded data for the candlestick series
        const mapping = dataTable.mapAs({
          open: 1,
          high: 2,
          low: 3,
          close: 4,
        });

        // Create the first plot on the chart
        const plot = chart.plot(0);

        // Set grid settings
        plot.yGrid(true).xGrid(true).yMinorGrid(true).xMinorGrid(true);

        // Create candlestick series
        const series = plot.candlestick(mapping).name(id.toUpperCase());
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
        chart.title(`${id.toUpperCase()} Stock Chart`);

        // Draw chart
        chart.draw();
      });

      // Cleanup function
      return () => {
        // Remove chart container's contents
        if (container) {
          container.innerHTML = "";
        }
      };
    }
  }, [name]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Stock Analysis Dashboard</h1>
      <p>
        This dashboard displays stock charts for various companies. The chart
        below shows data for {id.toUpperCase()}.
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
        <Link
          to={`/stock-analysis/${id}`}
          style={{ textDecoration: "none", color: "#007bff" }}
        >
          Go to {id.toUpperCase()} Analysis
        </Link>
      </footer>
    </div>
  );
};

export default IndividualStock;
