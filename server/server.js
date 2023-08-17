const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000"
    }
});

const cors = require('cors')
const corsOptions = require('./config/corsOptions.js');

const PORT = process.env.PORT || 3500;

app.use(express.json())

app.use(cors(corsOptions))

// Store room data
const rooms = {}; // roomId : {socketId: {name: , vote: }}

function addMemberToRoom(roomId, displayName, socketId){
    if (!rooms[roomId]) {   //this is the first time this room is being created
        rooms[roomId] = {}   
    }
    rooms[roomId][socketId] = {name: displayName, vote: null}
}

function removeMemberFromRoom(roomId, memberId){
    delete rooms[roomId][memberId]
}

function isDuplicateName(roomId, name){
    for(const memberId in rooms[roomId]){
        if( name === rooms[roomId][memberId].name){ //name already exists in room
            return true
        }
    }
    return false
}

function updateMemberVote(memberId, vote, roomId){
    rooms[roomId][memberId].vote = vote;
}

function clearAllVotes(roomId){
    for(const memberId in rooms[roomId]){
        rooms[roomId][memberId].vote = null
    }
}

io.on('connection', (socket) => {
    console.log(`A user connected with id: ${socket.id}`);
    
    socket.on('join-room', (roomId, displayName) => {
        if(isDuplicateName(roomId, displayName)){
            // Emit the event to the specific socket ID
            io.to(socket.id).emit('duplicate-name', displayName);
        }
        else{
            socket.join(roomId)
            
            addMemberToRoom(roomId, displayName, socket.id); //add member to stored rooms obj
            
            // Emit an event to notify all clients in the room about the updated member list
            const updatedMembers = rooms[roomId]
            io.to(roomId).emit('updateMembers', updatedMembers);
        }
    })

    socket.on('user-voted', (vote, roomId) => {
        updateMemberVote(socket.id, vote, roomId)

        const updatedMembers = rooms[roomId] 
        io.to(roomId).emit('updateMembers', updatedMembers);
    })

    socket.on('show-votes', (roomId) => {
        io.to(roomId).emit('display-votes'); //all members in the room should have the votes displayed
    })

    socket.on('clear-estimates', (roomId) => {
        clearAllVotes(roomId)

        const updatedMembers = rooms[roomId] 
        io.to(roomId).emit('updateMembers', updatedMembers);
        io.to(roomId).emit('clear-selected-points');
    })

    socket.on('disconnecting', () => {
        const socketRooms = socket.rooms;

        socketRooms.forEach((roomId) => {
            if (roomId !== socket.id) { //  remove from every room other than own id room
                removeMemberFromRoom(roomId, socket.id)

                //Emit an event to notify other members of the room
                const updatedMembers = rooms[roomId] 
                io.to(roomId).emit('updateMembers', updatedMembers);
                
                socket.leave(roomId);
            }
        });
      });
})

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

