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
        socket.emit('save-name', displayName)
    }

    const handleRoomIdChange = (e) => {
        setRoomId(e.target.value)
    }

    const handleJoinRoom = (e) => {
        if(finalName === ''){
            alert("Enter and Save display name")
        }
        else if(roomId === ''){
            alert("Enter a Room Id")
        }
        else{
            socket.emit('join-room', roomId, displayName)   //joins room and sends entry msg to everyone else in the room

            navigate(`/room/${encodeURIComponent(roomId)}`); // redirect to page with room info
        }
    }

    socket.on('connect', () => {
        console.log(`you connected. your socket id = ${socket.id}`)
    })

    socket.on('recieve-room-message', (message) => {
        console.log('broadcasted message to room is' + message)
    })

    return <>
        <div>
            <input type="text" placeholder="Enter Display Name" value={displayName} onChange={handleDisplayNameChange} /> 
            <button onClick={handleSaveDisplayName}>Save Name</button>


            <br/>
            <br/>
            <button>Create New Room</button>
            <br/>
            <br/>

            <input type="text" placeholder="Enter Room Id" value={roomId} onChange={handleRoomIdChange} />
            <button onClick={handleJoinRoom}>Join Room</button>
        </div>
    </>
}