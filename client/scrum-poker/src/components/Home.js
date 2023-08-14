import { useState } from "react";

export function Home({socket}){
    const [displayName, setDisplayName] = useState('');

    const handleDisplayNameChange = (e) => {
        setDisplayName(e.target.value);
        console.log(`new name = ${e.target.value}` )
        socket.emit('name', e.target.value)
    };

    socket.on('connect', () => {
        console.log(`you connected. your socket id = ${socket.id}`)
    })

    return <>
        <div>
            <input
            type="text"
            placeholder="Enter Display Name"
            value={displayName}
            onChange={handleDisplayNameChange}
            />
        </div>
    </>
}