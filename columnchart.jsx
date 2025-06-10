import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Card, CardContent, Typography } from '@mui/material';

const ColumnChart = ({ title = 'Stacked Column Chart', series = [], options = {}, height = 350 }) => {
  const defaultOptions = {
    chart: {
      type: 'bar',
      stacked: true,
      height,
      toolbar: {
        show: true
      },
      zoom: {
        enabled: true
      }
    },
    tooltip: {
      theme: "dark",
    },
    responsive: [{
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom',
          offsetX: -10,
          offsetY: 0
        }
      }
    }],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 10,
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'last',
        dataLabels: {
          total: {
            enabled: true,
            style: {
              fontSize: '13px',
              fontWeight: 900
            }
          }
        }
      }
    },
    xaxis: {
      type: 'datetime'
    },
    legend: {
      position: 'right',
      offsetY: 40
    },
    fill: {
      opacity: 1
    }
  };

  const mergedOptions = {
    ...defaultOptions,
    ...options,
    xaxis: {
      ...defaultOptions.xaxis,
      ...(options.xaxis || {})
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>{title}</Typography>
        <ReactApexChart options={mergedOptions} series={series} type="bar" height={height} />
      </CardContent>
    </Card>
  );
};

export default ColumnChart;