import { useState } from "react";
import { useNavigate } from 'react-router-dom';

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
            <input type="text" placeholder="Enter Display Name" value={displayName} onChange={handleDisplayNameChange} /> 
            <button onClick={handleSaveDisplayName}>Save Name</button>

            <br/>
            <br/>

            <input type="text" placeholder="Enter Room Id" value={roomId} onChange={handleRoomIdChange} />
            <button onClick={handleJoinRoom}>Join Room</button>
        </div>
    </>
}