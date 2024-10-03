import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import Link and useParams
import anychart from "anychart";
import "anychart/dist/css/anychart-ui.min.css";
import Toggle from "../Buttons/Toggle"; // Import the Toggle component

const StockAnalysis = () => {
  const { id } = useParams();

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

  useEffect(() => {
    const chartContainer = document.getElementById("chartContainer");

    if (chartContainer) {
      const stockChart = anychart.stock();
      stockChart.container(chartContainer);
      setChart(stockChart);

      anychart.data.loadCsvFile("/RELIANCE.csv", (data) => {
        const dataTable = anychart.data.table();
        dataTable.addData(data);
        const map = dataTable.mapAs({
          open: 1,
          high: 2,
          low: 3,
          close: 4,
          volume: 5,
        });
        setMapping(map);

        const mainPlot = stockChart.plot(0);
        mainPlot.yGrid(true).xGrid(true).yMinorGrid(true).xMinorGrid(true);
        const candlestickSeries = mainPlot
          .candlestick(map)
          .name(id.toUpperCase());
        candlestickSeries.legendItem().iconType("rising-falling");

        const indicatorPlot = stockChart.plot(1);
        indicatorPlot.yGrid(true).xGrid(true).yMinorGrid(true).xMinorGrid(true);

        anychart.ui.rangePicker().render(stockChart);
        anychart.ui.rangeSelector().render(stockChart);

        stockChart.title(`${id.toUpperCase()} Stock Chart`);

        stockChart.draw();

        updateIndicators(indicators);
      });

      return () => {
        chartContainer.innerHTML = "";
      };
    }
  }, []);

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

      const candlestickSeries = mainPlot
        .candlestick(mapping)
        .name(id.toUpperCase());
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
    <div style={{ padding: "20px" }}>
      <h1 className="text-2xl font-bold mb-4">Stock Analysis Dashboard</h1>
      <p className="text-gray-600 mb-6">
        This dashboard displays stock charts for various companies. The chart
        below shows data for {id}
      </p>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
        <Toggle
          label="Add EMA"
          checked={indicators.ema}
          onChange={() => toggleIndicator("ema")}
        />
        <Toggle
          label="Add SMA"
          checked={indicators.sma}
          onChange={() => toggleIndicator("sma")}
        />
        <Toggle
          label="Add PSAR"
          checked={indicators.psar}
          onChange={() => toggleIndicator("psar")}
        />
        <Toggle
          label="Add Price Channels"
          checked={indicators.priceChannels}
          onChange={() => toggleIndicator("priceChannels")}
        />
        <Toggle
          label="Add Bollinger Bands"
          checked={indicators.bbands}
          onChange={() => toggleIndicator("bbands")}
        />
        <Toggle
          label="Add MACD"
          checked={indicators.macd}
          onChange={() => toggleIndicator("macd")}
        />
        <Toggle
          label="Add Average True Range"
          checked={indicators.atr}
          onChange={() => toggleIndicator("atr")}
        />
        <Toggle
          label="Add Relative Strength Index"
          checked={indicators.rsi}
          onChange={() => toggleIndicator("rsi")}
        />
        <Toggle
          label="Add On-Balance Volume"
          checked={indicators.obv}
          onChange={() => toggleIndicator("obv")}
        />
        <Toggle
          label="Add Stochastic Oscillator"
          checked={indicators.stochastic}
          onChange={() => toggleIndicator("stochastic")}
        />
      </div>
      <div
        id="chartContainer"
        className="w-full h-[1000px] my-8 bg-gray-100 border border-gray-300"
      />
    </div>
  );
};

export default StockAnalysis;