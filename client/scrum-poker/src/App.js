import React from 'react';
import { Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';
import {Home} from './components/Home'

const socket = io('http://localhost:3500'); 

function App() {
  return <Routes>
    <Route path="/" element={<Home socket={socket}/>} />
    <Route />
  </Routes>
}

export default App;
