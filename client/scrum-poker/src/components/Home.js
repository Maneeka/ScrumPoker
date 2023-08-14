import { useState } from "react";

export function Home({socket}){
    const [displayName, setDisplayName] = useState('');
    const [roomId, setRoomId] = useState('');

    const handleDisplayNameChange = (e) => {
        setDisplayName(e.target.value);
    };
    
    const handleSaveDisplayName = () => {
        console.log("display name = " + displayName)
        socket.emit('save-name', displayName)
    }

    const handleRoomIdChange = (e) => {
        setRoomId(e.target.value)
    }

    const handleJoinRoom = (e) => {
        if(displayName === ''){
            alert("Enter display name")
        }
        else{
            socket.emit('join-room', roomId, displayName)
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