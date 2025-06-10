import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Card, CardContent, Typography } from '@mui/material';

const PieChart = ({ title = 'Donut Chart', series = [], options = {}, height = 350 }) => {
  const defaultOptions = {
    chart: {
      type: 'donut'
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }]
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    chart: {
      ...defaultOptions.chart,
      ...(options.chart || {})
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>{title}</Typography>
        <ReactApexChart options={mergedOptions} series={series} type="donut" height={height} />
      </CardContent>
    </Card>
  );
};

export default PieChart;