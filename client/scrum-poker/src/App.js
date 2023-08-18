import React from 'react';
import { Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';
import { Home } from './components/Home'
import { Room } from './components/Room';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import StyleIcon from '@mui/icons-material/Style';

const socket = io('http://localhost:3500'); 

function App() {
  return <>

    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: '#2E3B55' }}>
        <Toolbar>
          <StyleIcon fontSize="large" />
          
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, mr: 2, fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', color: 'inherit' }}>
            SCRUM POKER
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>

    <Routes>
      <Route path="/" element={ <Home socket={socket} />} />
      <Route path="/room/:id" element={ <Room socket={socket} /> }/>
    </Routes>
  </>
  
}

export default App;
