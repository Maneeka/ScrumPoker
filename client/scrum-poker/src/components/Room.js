import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';

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
            {Object.keys(members).map((memberDisplayName) => (
                <li key={members[memberDisplayName].memberId}>{memberDisplayName}</li>
            ))}
          </ul>
        </>
    );
}