import { useParams } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import { Points } from "./Points";
import Button from '@mui/material/Button';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { green } from "@mui/material/colors";
import { MemberTable } from "./MemberTable";

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
        return topVotes.join(', ')
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
            <h2>Room id: {id}</h2>

            <MemberTable members={members} isValidVote={isValidVote} showVotes={showVotes}/>

            <h2>Vote:</h2>
            <Points socket={socket} roomId={id}/> 
            
            <br/>  

            <Button variant="contained" onClick={handleShowVotes}>Show Votes</Button>

            {showVotes ? displayMajorityVotes(Object.values(members).map((member) => member.vote).filter((vote) => isValidVote(vote))) : ''}
        
            <br/>
            <Button variant="contained" color="secondary" onClick={handleClearEstimates}>Clear Estimates</Button>
        </>
    );
}