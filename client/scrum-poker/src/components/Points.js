import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';

export function Points({socket, roomId}){
    const [activeButton, setActiveButton] = useState(null);

    const handleButtonClick = (buttonId) => {
        if (activeButton === buttonId) {
          setActiveButton(-1); // Toggle off the active button
        } else {
          setActiveButton(buttonId); // Set the clicked button as active
        }
    };

    useEffect(() => {
        if(activeButton !== null){  //dont emit anything when the inital setup is done
            socket.emit('user-voted', activeButton, roomId);
        }
    }, [activeButton]); //emits the vote to the server after the activeButton value has been updated

    socket.on('clear-selected-points', () => {
        setActiveButton(null)
    })
    
    return (
        <>
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
