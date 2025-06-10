import React, { useEffect } from "react";
import { CssBaseline, Container, Box,} from "@mui/material";
import Plot from "react-plotly.js";

const SankeyChart = ({ nodes = [], links = [], mode }) => {

  const nodeLabels = nodes.map((node) => node.label);
  const linkColors = links.map((_, i) =>
    `rgba(${170 + i * 20}, 0, 0, 0.2)`
  );

  const data = [
    {
      type: "sankey",
      node: {
        pad: 10,
        thickness: 20,
        label: nodeLabels,
        color: "rgba(0, 189, 63, 0.4)",
      },
      link: {
        source: links.map((link) => link.source),
        target: links.map((link) => link.target),
        value: links.map((link) => link.value),
        color: linkColors,
      },
    },
  ];

  const layout = {
    font: {
      size: 10,
      color:"#222222",
    },
    paper_bgcolor: mode.mode =='dark' ? "rgba(255, 255, 255, 0.00)" : "#ffffff",
    margin: {l: 30,r: 30,t: 10, b: 10},
  };

  return (
    <Box sx={{width:"100%", height:350}}>
      <Plot data={data} layout={layout} style={{height: "200px", width:"100%"}}/>
    </Box>
  );
};

export default SankeyChart;