import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import anychart from "anychart";
import "anychart/dist/css/anychart-ui.min.css";
import Loader from "../Loader/Loader";
import Navbar from "../NavBar/Navbar";
import StockNavbar from "./StockNavbar";
import parse from "html-react-parser";

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

  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  useEffect(() => {
    const container = document.getElementById("chartContainer");

    if (container && stockData) {
      const chart = anychart.stock();
      chart.container(container);

      const dataTable = anychart.data.table("x");

      const formattedData = stockData.map((item) => ({
        x: item.Date,
        close: item.Close,
      }));

      dataTable.addData(formattedData);

      const mapping = dataTable.mapAs({
        value: "close",
      });

      const plot = chart.plot(0);
      plot.yGrid(true).xGrid(true).yMinorGrid(true).xMinorGrid(true);

      const series = plot.line(mapping).name("LTP");
      series.legendItem().iconType("line");

      series.stroke("#28a745", 3);

      chart.scroller().line(mapping);

      const rangePicker = anychart.ui.rangePicker();
      rangePicker.render(chart);

      const rangeSelector = anychart.ui.rangeSelector();
      rangeSelector.render(chart);

      chart.title(`${name.toUpperCase()}`);

      chart.draw();

      return () => {
        if (container) {
          container.innerHTML = "";
        }
      };
    }
  }, [id, stockData]);

  if (!stockData) {
    return <Loader />;
  }

  return (
    <div className="bg-gray-200">
      <Navbar />
      <StockNavbar companyName={companyName} ltp={ltp} change={change} />
      <div className="p-6 mx-4 my-3 shadow-2xl bg-white rounded-lg">
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
      <div className="p-6 mx-4 my-3 shadow-md bg-white rounded-lg hover:shadow-xl transition-shadow duration-200">
        <h3 className="text-3xl font-bold mb-2">Key Indicators</h3>
        <div>
          {pageData && pageData.data && pageData.data.section_1
            ? parse(
                pageData.data.section_1
                  .replace(/md:gap-x-8/g, "md:gap-x-16 text-lg")
                  .replace(/<h2[^>]*>.*?<\/h2>/gi, "")
                  .replace(/text-xs/g, "text-base")
              )
            : "Loading..."}
        </div>
      </div>

      <div className="p-6 mx-4 my-3 shadow-md bg-white rounded-lg hover:shadow-xl transition-shadow duration-200">
        <h3 className="text-3xl font-bold mb-2">Peer Comparison</h3>
        <div>
          {pageData && pageData.data && pageData.data.section_5
            ? parse(
                pageData.data.section_5
                  .replace(/<h2[^>]*>.*?<\/h2>/gi, "")
                  .replace(/text-xs/g, "text-base")
                  .replace(/text-sm/g, "text-lg")
                  .replace(/href="[^"]*"/gi, "")
                  .replace(/View detailed comparison/gi, "")
              )
            : "Loading..."}
        </div>
      </div>

      <div className="p-6 mx-4 my-3 shadow-md bg-white rounded-lg hover:shadow-xl transition-shadow duration-200">
        <h3 className="text-3xl font-bold mb-2">About {companyName}</h3>
        <div>
          {pageData && pageData.data && pageData.data.section_6
            ? parse(
                pageData.data.section_6
                  .replace(/<h2[^>]*>.*?<\/h2>/gi, "")
                  .replace(/text-xs/g, "")
                  .replace(/text-sm/g, "text-lg")
                  .replace(/<button[^>]*>.*?<\/button>/gi, "")
                  .replace(
                    /<h3[^>]*className="text-lg font-proximaNovaSemibold flex justify-between items-center mt-4"[^>]*>/gi,
                    '<h3 class="font-bold mt-4 text-xl">'
                  )
              )
            : "Loading..."}
        </div>
      </div>

      <div className="p-6 mx-4 my-3 shadow-md bg-white rounded-lg hover:shadow-xl transition-shadow duration-200">
        <h3 className="text-2xl font-bold mb-4">{companyName} Shares FAQs</h3>
        <div className="space-y-2">
          {pageData.faqs.length > 0 ? (
            pageData.faqs.map((faq, index) => (
              <div key={index} className="border-b py-2">
                <button
                  onClick={() => handleToggle(index)}
                  className="w-full text-left text-lg font-semibold text-gray-800 focus:outline-none flex justify-between items-center"
                >
                  {faq.question}
                  <span className="text-gray-500 text-sm">
                    {openIndex === index ? "▲" : "▼"}
                  </span>
                </button>
                {openIndex === index && (
                  <p className="mt-2 text-gray-700">{faq.answer}</p>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500">Loading FAQs...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default IndividualStock;
