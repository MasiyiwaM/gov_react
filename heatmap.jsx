import React from "react";
import Chart from "react-apexcharts";
import { Card, Typography } from "@mui/material";

const defaultOptions = {
  legend: {
    show: false
  },
  chart: {
    type: "treemap"
  },
  tooltip: {
    theme: "dark",
    x: { show: true },
    y: {
      title: {
        formatter: function () {
          return "";
        }
      }
    }
  },
  dataLabels: {
    enabled: true,
    style: {
      fontSize: "12px"
    },
    formatter: function (text, op) {
      return [text, op.value];
    },
    offsetY: -4
  },
  plotOptions: {
    treemap: {
      enableShades: true,
      shadeIntensity: 0.5,
      reverseNegativeShade: true,
      colorScale: {
        ranges: [
          {
            from: -50,
            to: 0,
            color: "#D50000"
          },
          {
            from: 0.0000001,
            to: 50,
            color: "#52B12C"
          }
        ]
      }
    }
  }
};

const Heatmap = ({ title = "Heatmap", series, options = {} }) => {
  const mergedOptions = {
    ...defaultOptions,
    ...options,
    title: {
      ...defaultOptions.title,
      ...options.title,
      text: title
    }
  };

  return (
    <Card sx={{height:432}}>
      <Chart options={mergedOptions} series={series} type="treemap" height="100%" />
    </Card>
  );
};

export default Heatmap;