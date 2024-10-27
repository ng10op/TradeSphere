import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import anychart from "anychart";
import "anychart/dist/css/anychart-ui.min.css";
import Toggle from "../Buttons/Toggle";
import Navbar from "../NavBar/Navbar";
import indicatorData from "./data.json";

const StockAnalysis = () => {
  const { id } = useParams();
  const name = id.replace(/-/g, " ");
  const location = useLocation();
  const { stockData } = location.state || {};

  const [activeIndex, setActiveIndex] = useState(null);
  const [chart, setChart] = useState(null);
  const [mapping, setMapping] = useState(null);
  const [indicators, setIndicators] = useState({
    ema: false,
    sma: false,
    psar: false,
    priceChannels: false,
    bbands: false,
    macd: false,
    atr: false,
    rsi: false,
    obv: false,
    stochastic: false,
  });

  const toggleIndicators = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const chartContainer = document.getElementById("chartContainer");

    if (chartContainer && stockData) {
      const stockChart = anychart.stock();
      stockChart.container(chartContainer);
      setChart(stockChart);

      const dataTable = anychart.data.table("x");
      const formattedData = stockData.map((item) => ({
        x: item.Date,
        open: item.Open,
        high: item.High,
        low: item.Low,
        close: item.Close,
        volume: item.Volume,
      }));
      dataTable.addData(formattedData);

      const map = dataTable.mapAs({
        open: "open",
        high: "high",
        low: "low",
        close: "close",
        volume: "volume",
      });
      setMapping(map);

      const mainPlot = stockChart.plot(0);
      mainPlot.yGrid(true).xGrid(true).yMinorGrid(true).xMinorGrid(true);
      const candlestickSeries = mainPlot.candlestick(map).name("DATA");
      candlestickSeries.legendItem().iconType("rising-falling");

      const indicatorPlot = stockChart.plot(1);
      indicatorPlot.yGrid(true).xGrid(true).yMinorGrid(true).xMinorGrid(true);

      anychart.ui.rangePicker().render(stockChart);
      anychart.ui.rangeSelector().render(stockChart);

      stockChart.title(`${name.toUpperCase()} Candlestick Chart`);

      stockChart.draw();

      updateIndicators(indicators);
    }

    return () => {
      if (chartContainer) {
        chartContainer.innerHTML = "";
      }
    };
  }, [stockData]);

  const toggleIndicator = (indicator) => {
    setIndicators((prevIndicators) => {
      const newIndicators = {
        ...prevIndicators,
        [indicator]: !prevIndicators[indicator],
      };
      updateIndicators(newIndicators);
      return newIndicators;
    });
  };

  const updateIndicators = (currentIndicators) => {
    if (chart && mapping) {
      const mainPlot = chart.plot(0);
      const indicatorPlot = chart.plot(1);
      mainPlot.removeAllSeries();
      indicatorPlot.removeAllSeries();

      const candlestickSeries = mainPlot.candlestick(mapping).name("DATA");
      candlestickSeries.legendItem().iconType("rising-falling");

      if (currentIndicators.ema) {
        const ema = mainPlot.ema(mapping, 20).series();
        ema.stroke("#bf360c");
      }
      if (currentIndicators.sma) {
        const sma = mainPlot.sma(mapping, 50).series();
        sma.stroke("#ff69b4");
      }
      if (currentIndicators.psar) {
        const psar = mainPlot.psar(mapping, 0.03, 0.2, 0.5, "line").series();
        psar.stroke("2 red");
      }
      if (currentIndicators.priceChannels) {
        const priceChannels_0 = mainPlot.priceChannels(mapping, 10);
        priceChannels_0.middleSeries().stroke("2 #ef6c00");
        priceChannels_0.rangeSeries().fill("#ffd54f 0.2");
      }
      if (currentIndicators.bbands) {
        const bbands = mainPlot.bbands(
          mapping,
          10,
          3,
          "spline",
          "spline",
          "spline"
        );
        bbands.upperSeries().stroke("#bf360c");
        bbands.middleSeries().stroke("#ff6600");
        bbands.lowerSeries().stroke("#bf360c");
        bbands.rangeSeries().fill("#ffd54f 0.2");
      }

      if (currentIndicators.macd) {
        const macd = indicatorPlot.macd(mapping, 12, 26, 9);
        macd.macdSeries().stroke("#bf360c");
        macd.signalSeries().stroke("#ff6d00");
        macd.histogramSeries().fill("#ffe082");
      }
      if (currentIndicators.atr) {
        const atr = indicatorPlot.atr(mapping, 30, "column").series();
        atr.fill("#ff6d00");
      }
      if (currentIndicators.rsi) {
        const rsi = indicatorPlot.rsi(mapping, 14).series();
        rsi.stroke("#bf360c");
      }
      if (currentIndicators.obv) {
        const obv = indicatorPlot.obv(mapping, "area").series();
        obv.stroke("0.5 gray");
        obv.fill("#ffd54f");
      }
      if (currentIndicators.stochastic) {
        const stochastic = indicatorPlot.stochastic(
          mapping,
          10,
          "EMA",
          10,
          "SMA",
          20
        );
        stochastic.kSeries().stroke("#bf360c");
        stochastic.dSeries().stroke("#ff6d00");
      }

      chart.draw();
    }
  };

  return (
    <div className="bg-gray-200">
      <Navbar />
      <div className="flex p-6 mx-4 my-3 shadow-xl bg-white rounded-lg">
        <div className="w-[15%] p-4 my-auto">
          <div className="grid grid-cols-1 gap-4">
            <Toggle
              label="EMA"
              checked={indicators.ema}
              onChange={() => toggleIndicator("ema")}
            />
            <Toggle
              label="SMA"
              checked={indicators.sma}
              onChange={() => toggleIndicator("sma")}
            />
            <Toggle
              label="PSAR"
              checked={indicators.psar}
              onChange={() => toggleIndicator("psar")}
            />
            <Toggle
              label="Price Channels"
              checked={indicators.priceChannels}
              onChange={() => toggleIndicator("priceChannels")}
            />
            <Toggle
              label="Bollinger Bands"
              checked={indicators.bbands}
              onChange={() => toggleIndicator("bbands")}
            />
            <Toggle
              label="MACD"
              checked={indicators.macd}
              onChange={() => toggleIndicator("macd")}
            />
            <Toggle
              label="ATR"
              checked={indicators.atr}
              onChange={() => toggleIndicator("atr")}
            />
            <Toggle
              label="RSI"
              checked={indicators.rsi}
              onChange={() => toggleIndicator("rsi")}
            />
            <Toggle
              label="OBV"
              checked={indicators.obv}
              onChange={() => toggleIndicator("obv")}
            />
            <Toggle
              label="Stochastic Oscillator"
              checked={indicators.stochastic}
              onChange={() => toggleIndicator("stochastic")}
            />
          </div>
        </div>

        <div
          id="chartContainer"
          className="w-[90%] shadow-md rounded-lg bg-white mb-4 p-4"
          style={{
            height: "850px",
            border: "1px solid #ddd",
          }}
        />
      </div>

      <div className="mx-4 shadow-md rounded-lg bg-white mb-4 mt-8 p-6 space-y-6">
        <h2 className="text-4xl font-bold text-black mb-8 text-center">
          About Indicators
        </h2>

        {indicatorData.map((indicator, index) => (
          <div
            key={index}
            className="w-[90%] mx-auto transition-all duration-200 bg-white border border-gray-200 cursor-pointer hover:bg-gray-50 shadow-md hover:shadow-xl transition-shadow duration-200 rounded-lg"
          >
            <button
              type="button"
              onClick={() => toggleIndicators(index)}
              className="flex items-center justify-between w-full px-4 py-5 sm:p-6"
            >
              <span className="flex text-lg font-semibold text-black text-xl">
                {indicator.indicator}
              </span>
              <svg
                className={`w-6 h-6 text-gray-400 transition-transform duration-200 ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {activeIndex === index && (
              <div className="px-6 pb-6 bg-gray-50 rounded-lg text-lg mx-auto space-y-4">
                <p className="mb-2 text-gray-700 leading-relaxed">
                  <strong className="text-gray-900">Description: </strong>
                  {indicator.description}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  <strong className="text-gray-900">Use: </strong>
                  {indicator.use}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StockAnalysis;
