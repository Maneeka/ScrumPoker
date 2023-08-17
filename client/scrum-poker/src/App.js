import React from 'react';
import { Routes, Route } from 'react-router-dom';
import io from 'socket.io-client';
import { Home } from './components/Home'
import { Room } from './components/Room';

const socket = io('http://localhost:3500'); 

function App() {
  return <Routes>
    <Route path="/" element={ <Home socket={socket} />} />
    <Route path="/room/:id" element={ <Room socket={socket} /> }/>
  </Routes>
}

export default App;
