import React, { useState, useEffect, useRef, useMemo } from "react";
import { blue, deepOrange } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, Divider, Box, AppBar, TextField, Paper, Select, Toolbar, FormControl, InputLabel, InputAdornment,
Typography, Button, Menu, MenuItem, IconButton, Avatar, Modal, CircularProgress, Snackbar, Skeleton} from "@mui/material";
import { Article, BarChart, Contrast, Logout, } from "@mui/icons-material";
import useMediaQuery from '@mui/material/useMediaQuery';

import AreaChart from './areachart.jsx'
import PieChart from './piechart.jsx'
import Heatmap from './heatmap.jsx'
import ColumnChart from './columnchart.jsx'
import TextRender from './textrender.jsx'

const data_text = [
  { type: 'heading', content: 'Monthly Report' },
  { type: 'paragraph', content: 'This report summarizes the monthly performance.' },
  {
    type: 'list',
    content: ['Sales increased by 15%', 'Customer churn reduced', 'New product launched']
  },
  {
    type: 'table',
    content: [
      { Name: 'Product A', Sales: 1000, Growth: '10%' },
      { Name: 'Product B', Sales: 750, Growth: '5%' }
    ]
  }
];


const Result = (props) => {
  const date = new Date();

  const systemPrefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const [mode, setMode] = useState('dark');
  const [name, setName] = useState('')
  const [content, setContent] = useState([])
  const [loading, setLoading]=useState(false)
  const [open, setOpen]=useState({open:false,message:''})

  const theme = useMemo(() =>
    createTheme({
      palette: {
        mode: mode,
        secondary:{
          main: mode === 'dark' ? '#313338' : '#fff',
        }
      },
    }),
    [mode],
  );

  useEffect(() => {
    fetch(`${props.host}/file?file=${props.file}` )
      .then(response => response.json())
      .then(data => {
        if(!data.error){
          setContent(data.data)
        }
      })
      .catch(error => setOpen({open:true,message:'Error fetching market data: '+error}));
  }, []);

  useEffect(() => {
    const savedMode = localStorage.getItem('app-theme-mode');

    if (savedMode) {
      setMode(savedMode);
    } else {
      setMode(systemPrefersDarkMode ? 'dark' : 'light');
    }
  }, [systemPrefersDarkMode]);


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const changeTheme = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
    localStorage.setItem('app-theme-mode', newMode);
  }

  const logout= () =>{
    document.cookie = `munashe-cookie=; Max-Age=0; path=/;`;
    window.location.href = `/`;
  }

  //sample Area Chart impleamentation
  const series = [
    {
      name: 'series1',
      data: [31, 40, 100]
    },
    {
      name: 'series2',
      data: [11, 32, 41]
    }
  ];

  const options = {
    xaxis: {
      type: 'datetime',
      categories: [
        "2018-09-19T00:00:00.000Z",
        "2018-09-19T01:30:00.000Z",
        "2018-09-19T06:30:00.000Z"
      ]
    }
  };

  //example heatmap data

  const heat={
    series:[{ data:[{x:'Munya', y:20},{x:'Mogo',y:13},{x:'Zende',y:-17}]}]
  }

  //example for pie chart
  const series_pie = [44, 55, 41, 17, 15];
  const options_pie = {
    labels: ['Apple', 'Mango', 'Orange', 'Banana', 'Grapes']
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Use the 'mode' state to conditionally apply styles */}
      <AppBar position="sticky" elevation={mode === 'dark' ? 1 : 0} color="secondary">
        <Toolbar sx={{ justifyContent: "space-between" }} variant="dense">
          <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
            <Typography variant="overline" color='primary' mb={0} sx={{display: { xs: 'none', md: 'flex' }}}>
              Munashe's App
            </Typography>
            <Typography variant="overline" color='primary' mb={0} sx={{display: { xs: 'flex', md: 'none' }}}>
              Munashe's App
            </Typography>
          </Box>
          <Box sx={{ display: 'flex'}}>
            <IconButton>
              <Avatar variant="rounded" sx={{ bgcolor:blue[200], width:'20px', height:'20px' }}><Article/></Avatar>
            </IconButton>
            <Button size="small" variant="text" sx={{color:'action.active'}}>
              {name}<Typography>{props.file}</Typography>
            </Button>
            {/* Use the changeTheme function here */}
            <IconButton onClick={changeTheme}><Contrast/></IconButton>
            <IconButton onClick={logout}><Logout/></IconButton>
          </Box>
        </Toolbar>
        {loading && (<Modal open={loading}><CircularProgress size={24} sx={{position: 'absolute',top: '50%',left: '50%',}}/></Modal>)}
        <Snackbar open={open.open} autoHideDuration={5000} onClose={handleClose} message={open.message}/>
      </AppBar>

      {/*APP CONTENT */}

      <Box sx={{bgcolor: mode === 'dark' ? 'background.default' : '#f0f0f0', p:'4px',minHeight:{xs:'88vh',md:'87vh'}}}>
        {content.reduce((rows, item, index) => {
          const component = (() => {
            switch (item.palette) {
              case 'areachart':
                return <AreaChart key={index} title={item.content.title || 'Area Chart'} series={item.content.series} options={item.content.options} />;
              case 'barchart':
                return <ColumnChart key={index} title={item.content.title || 'Column Chart'} series={item.content.series} options={item.content.options} />;
              case 'piechart':
                return <PieChart key={index} title={item.content.title || 'Pie Chart'} series={item.content.series} options={item.content.options} />;
              case 'heatmap':
                return <Heatmap key={index} title={item.content.title || 'Heatmap'} series={item.content.series} />;
              case 'text':
                return <TextRender key={index} content={item.content} />;
              default:
                return <Paper key={index} sx={{ p: 2 }}><Typography variant="body2">Unknown component: {item.palette}</Typography></Paper>;
            }
          })();

          const rowIndex = Math.floor(index / 2);
          if (!rows[rowIndex]) rows[rowIndex] = [];
          rows[rowIndex].push(
            <Box key={index} sx={{ width: '50%', px: '3px' }}>
              {component}
            </Box>
          );
          return rows;
        }, []).map((row, idx) => (
          <Box key={idx} sx={{ display: 'flex', my: '3px' }}>
            {row}
            {row.length < 2 && <Box sx={{ width: '50%', px: '3px' }} />} {/* Fill empty space if only 1 item */}
          </Box>
        ))}
      </Box>
      <Box sx={{bgcolor:'background.default',display: 'flex', justifyContent:'space-between', px:2}}>
        <Box>
          <Typography variant='caption' sx={{fontSize: 11}}>© Munashe Masiyiwa | UZ</Typography>
        </Box>
        <Box>
          <Typography variant='caption' sx={{fontSize: 10}}>{date.getDate()+'/'+(date.getMonth() + 1)+'/'+date.getFullYear()}   {date.getHours()+':'+date.getMinutes()} </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Result;