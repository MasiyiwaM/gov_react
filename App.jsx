import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './App.css';

import Home from './home.jsx';
import Result from './result.jsx'

function App() {
  const [user, setUser] = useState('');
  const [screen, setScreen] = useState('home')
  const [file, setFile] = useState('')
  const [loading, setLoading] = useState(true);
  const [logged, setLoggedIn] = useState(false);

  const changeScreen=(n,f)=>{
    setScreen(n)
    setFile(f)
  }

  const host = "http://127.0.0.1:8080"

  return (
    <>
      {
        screen == 'home' ? (
          <Home host={host} screen={changeScreen}/>
        ):(
          <Result host={host} file={file}/>
        )
      }
    </>
  );
}

export default App;