import { useEffect, useRef, useState } from "react";
import {
  createChart,
  CandlestickSeries,
  ColorType,
} from "lightweight-charts";

import { getCryptoOHLC } from "../../../services/cryptoService";

function CandlestickChart({ coinId = "bitcoin" }) {
  const chartContainer = useRef(null);
  const [days, setDays] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!chartContainer.current) return;

    const chart = createChart(chartContainer.current, {
      width: chartContainer.current.clientWidth,
      height: 350,
      layout: {
        background: {
          type: ColorType.Solid,
          color: "#151923",
        },
        textColor: "#9298a5",
      },
      grid: {
        vertLines: { color: "#252b38" },
        horzLines: { color: "#252b38" },
      },
      rightPriceScale: {
        borderColor: "#303747",
      },
      timeScale: {
        borderColor: "#303747",
        timeVisible: true,
      },
    });

    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#16c784",
      downColor: "#ea3943",
      borderUpColor: "#16c784",
      borderDownColor: "#ea3943",
      wickUpColor: "#16c784",
      wickDownColor: "#ea3943",
    });

    let cancelled = false;

    async function loadCandles() {
      try {
        setLoading(true);
        setError("");

        const data = await getCryptoOHLC(coinId, days);

        if (cancelled) return;

        const candles = data.map((item) => ({
          time: Math.floor(item[0] / 1000),
          open: item[1],
          high: item[2],
          low: item[3],
          close: item[4],
        }));

        candleSeries.setData(candles);
        chart.timeScale().fitContent();

        if (candles.length === 0) {
          setError("No historical data available.");
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Unable to load chart data.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadCandles();

    const resizeObserver = new ResizeObserver(() => {
      if (chartContainer.current) {
        chart.applyOptions({
          width: chartContainer.current.clientWidth,
        });
      }
    });

    const refreshInterval = setInterval(() => {
      loadCandles();
    }, 60000);

    resizeObserver.observe(chartContainer.current);

    return () => {
      cancelled = true;
      clearInterval(refreshInterval);

      resizeObserver.disconnect();
      chart.remove();
    };
  }, [coinId, days]);

  const timeframes = [
    { label: "1D", value: 1 },
    { label: "7D", value: 7 },
    { label: "30D", value: 30 },
    { label: "90D", value: 90 },
  ];

  return (
    <div className="candlestick-section">
      <div className="chart-header">
        <h3>Price Chart</h3>
        <span className="demo-chart-label">LIVE MARKET DATA</span>
      </div>

      <div className="chart-timeframes">
        {timeframes.map((time) => (
          <button
            key={time.value}
            className={days === time.value ? "active-timeframe" : ""}
            onClick={() => setDays(time.value)}
          >
            {time.label}
          </button>
        ))}
      </div>

      {loading && <p>Loading market chart...</p>}

      {error && <p>{error}</p>}

      <div ref={chartContainer} className="candlestick-chart" />
    </div>
  );
}

export default CandlestickChart;