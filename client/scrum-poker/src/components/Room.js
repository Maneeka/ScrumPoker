import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { Points } from "./Points";

export function Room({socket}) {
    const { id } = useParams()
    const [members, setMembers] = useState({}); //object containing all the {displayName: member obj} pairs
    

    useEffect(() => {
        socket.on('updateMembers', (updatedMembers) => {
            setMembers(updatedMembers);
        })
    })

    return (
        <>
            <h2>Room id: {id}</h2>
            <h3>Members:</h3>
            <ul>
                {Object.keys(members).map((memberId) => (
                    <li key={memberId}>{members[memberId].name} has voted {members[memberId].vote}</li>
                ))}
            </ul>

            <h2>Vote:</h2>
            <Points socket={socket} roomId={id}/>                    
        </>
    );
}