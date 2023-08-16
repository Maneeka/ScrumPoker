import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';

export function Room({socket}) {
    const { id } = useParams()
    const [members, setMembers] = useState({}); //object containing all the {displayName: member obj} pairs
    const [activeButton, setActiveButton] = useState(null);

    useEffect(() => {
        socket.on('updateMembers', (updatedMembers) => {
            setMembers(updatedMembers);
        })
    })

    const handleButtonClick = (buttonId) => {
        if (activeButton === buttonId) {
          setActiveButton(null); // Toggle off the active button
        } else {
          setActiveButton(buttonId); // Set the clicked button as active
        }
    };

    return (
        <>
            <h2>Room id: {id}</h2>
            <h3>Members:</h3>
            <ul>
                {Object.keys(members).map((memberId) => (
                    <li key={memberId}>{members[memberId].name}</li>
                ))}
            </ul>

            <h2>Vote:</h2>
            {/* <Button variant="contained" color={isActive ? 'secondary' : 'primary'} onClick={handleClick}>3</Button> */}
            <Button variant={activeButton === 0 ? 'contained' : 'outlined'} color={activeButton === 0 ? 'secondary' : 'primary'} onClick={() => handleButtonClick(0)} > 0 </Button>
            <Button variant={activeButton === 0.5 ? 'contained' : 'outlined'} color={activeButton === 0.5 ? 'secondary' : 'primary'} onClick={() => handleButtonClick(0.5)} > 0.5 </Button>
            <Button variant={activeButton === 1 ? 'contained' : 'outlined'} color={activeButton === 1 ? 'secondary' : 'primary'} onClick={() => handleButtonClick(1)} >1 </Button>
            <Button variant={activeButton === 2 ? 'contained' : 'outlined'} color={activeButton === 2 ? 'secondary' : 'primary'} onClick={() => handleButtonClick(2)} >2 </Button>
            <Button variant={activeButton === 3 ? 'contained' : 'outlined'} color={activeButton === 3 ? 'secondary' : 'primary'} onClick={() => handleButtonClick(3)} >3 </Button>
            <Button variant={activeButton === 5 ? 'contained' : 'outlined'} color={activeButton === 5 ? 'secondary' : 'primary'} onClick={() => handleButtonClick(5)} >5 </Button>
            <Button variant={activeButton === 8 ? 'contained' : 'outlined'} color={activeButton === 8 ? 'secondary' : 'primary'} onClick={() => handleButtonClick(8)} >8 </Button>
            <Button variant={activeButton === 13 ? 'contained' : 'outlined'} color={activeButton === 13 ? 'secondary' : 'primary'} onClick={() => handleButtonClick(13)} >13 </Button>
                    
        </>
    );
}