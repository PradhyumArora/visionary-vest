// PriceChart.tsx
import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

interface PriceChartProps {
  data: {
    labels: string[];
    price: number[];
    volume: number[];
  };
}

const PriceChart: React.FC<PriceChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!chartRef.current || !data) return;

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: data.labels,
        datasets: [
          {
            label: "Volume",
            data: data.price,
            yAxisID: "price-axis",
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
          {
            type: "line",
            label: "Price",
            data: data.volume,
            yAxisID: "price-axis",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {
          y: {
            type: "linear",
            display: true,
            position: "right",
            id: "price-axis",
          },
        },
      },
    });

    return () => {
      myChart.destroy();
    };
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default PriceChart;
