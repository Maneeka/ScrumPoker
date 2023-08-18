import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export function Home({socket}){
    const [displayName, setDisplayName] = useState('');
    const [finalName, setFinalName] = useState('');
    const [roomId, setRoomId] = useState('');
    const navigate = useNavigate();

    const handleDisplayNameChange = (e) => {
        setDisplayName(e.target.value);
    };
    
    const handleSaveDisplayName = () => {
        setFinalName(displayName);
    }

    const handleRoomIdChange = (e) => {
        setRoomId(e.target.value)
    }

    const handleJoinRoom = () => {
        if(finalName === ''){
            alert("Enter and Save display name")
        }
        else if(roomId === ''){
            alert("Enter a Room Id")
        }
        else{
            socket.emit('join-room', roomId, displayName)   //joins user to room specified by roomId

            navigate(`/room/${encodeURIComponent(roomId)}`); // redirect to page with room info
        }
    }

    socket.on('connect', () => {
        console.log(`you connected. your socket id = ${socket.id}`)
        
        socket.on('duplicate-name', duplicateName => {
            alert(`${duplicateName} has already been taken. Please enter a different name.`)
            navigate('/'); // Navigate to the homepage to re-enter name
        })
    })

    return <>
        <div>
            <Box textAlign='center' sx={{marginTop:25}}>
                <TextField id="name-input" label="Enter Display Name" value={displayName} onChange={handleDisplayNameChange} variant="standard"  InputLabelProps={{ style: {color: '#304674', fontFamily:"monospace", fontSize:15}}}/>
                <Button variant="contained" sx={{backgroundColor:"#427c8a", margin: 1, height: 35}} onClick={handleSaveDisplayName}>Save Name</Button>
            </Box>

            <Box textAlign='center' >
                <TextField id="room-input" label="Enter Room Id" value={roomId} onChange={handleRoomIdChange} variant="standard"  InputLabelProps={{ style: {color: '#304674', fontFamily:"monospace", fontSize:15}}}/>
                <Button variant="contained" sx={{backgroundColor:"#2E3B55", margin: 1, height: 35}} onClick={handleJoinRoom}>Join Room</Button>
            </Box>
        </div>
    </>
}