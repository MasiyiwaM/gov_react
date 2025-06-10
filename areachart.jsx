import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Card, CardContent, Typography } from '@mui/material';

const AreaChart = ({ title = 'Area Chart', series = [], options = {}, height = 350 }) => {
  const defaultOptions = {
    chart: {
      type: 'area',
      height: height,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },
    xaxis: {
      type: 'datetime',
    },
    tooltip: {
      theme: "dark",
      x: {
        format: 'dd/MM/yy HH:mm',
      },
    },
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    xaxis: {
      ...defaultOptions.xaxis,
      ...(options.xaxis || {}),
    },
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>{title}</Typography>
        <ReactApexChart options={mergedOptions} series={series} type="area" height={height} />
      </CardContent>
    </Card>
  );
};

export default AreaChart;