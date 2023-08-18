import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { Points } from "./Points";
import Button from '@mui/material/Button';
import { MemberTable } from "./MemberTable";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { MajorityVotes } from "./MajorityVotes";


export function Room({socket}) {
    const { id } = useParams()
    const [members, setMembers] = useState({}); //object containing all the {memberId: member obj} pairs
    const [showVotes, setShowVotes] = useState(false)

    useEffect(() => {
        socket.on('updateMembers', (updatedMembers) => {
            setMembers(updatedMembers);
        })

        socket.on('display-votes', () => {
            setShowVotes(true)
        })
    }, [socket])

    const handleShowVotes = () => {
        setShowVotes((prevShowVotes) => !prevShowVotes); // Toggle the showVotes state
    };

    const isValidVote = (vote) => {
        return vote !== null && vote !== -1 //returns true for any of the valid pointing scores
    }

    const displayMajorityVotes = (allVotes) => {
        let frequencyMap = {};
        // Create a frequency map of values in the array
        allVotes.forEach((vote) => {
            frequencyMap[vote] = (frequencyMap[vote] || 0) + 1;
        });

        let vals = Object.values(frequencyMap)
        let maxFreq = Math.max(...vals)

        let topVotes = Object.keys(frequencyMap).filter(vote => frequencyMap[vote] === maxFreq)
        return topVotes
    }

    const handleClearEstimates = () => {
        socket.emit('clear-estimates', id)
    }

    socket.on('clear-selected-points', () => {
        setShowVotes(false)
    })

    useEffect(() => {
        if(showVotes){
            socket.emit('show-votes', id)
        }
    }, [showVotes])

    return (
        <>
            <Typography level="h1" sx={{fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', fontSize:40, textAlign:"center", color:"#2a3142"}}>ROOM ID: {id}</Typography>

            <MemberTable members={members} isValidVote={isValidVote} showVotes={showVotes}/>

            <Typography level="h1" sx={{fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.3rem', fontSize:40, textAlign:"center", color:"#2a3142", marginTop:5}}>VOTE:</Typography>
            <Points socket={socket} roomId={id} /> 
            
            <br/>  

            <Box textAlign='center' >
                <Button variant="contained" sx={{backgroundColor:"#427c8a", margin: 1}} onClick={handleShowVotes}>Show Votes</Button>
                <Button variant="contained" sx={{backgroundColor:"#6c6692"}} onClick={handleClearEstimates}>Clear Estimates</Button>
            </Box>

            {showVotes ? <MajorityVotes topVotes={displayMajorityVotes(Object.values(members).map((member) => member.vote).filter((vote) => isValidVote(vote)))}/> : ''}
    
            <br/>
        </>
    );
}