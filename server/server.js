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

const path = require('path');
const cors = require('cors')
const corsOptions = require('./config/corsOptions.js');

const PORT = process.env.PORT || 3500;

app.use(express.json())

app.use(cors(corsOptions))

app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/root'))

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' })
    } else {
        res.type('txt').send('404 Not Found')
    }
})

//TODO
// Store room data
const rooms = {}; // roomId : {socketId: {memberinfo like name and vote}}

function addMemberToRoom(roomId, displayName, socketId){
    if (!rooms[roomId]) {   //this is the first time this room is being created
        rooms[roomId] = {}   
    }
    rooms[roomId][socketId] = {name: displayName, vote: ''}
}

function removeMemberFromRoom(roomId, memberId){
    delete rooms[roomId][memberId]
}

function isDuplicate(roomId, name){
    for(const memberId in rooms[roomId]){
        if( name === rooms[roomId][memberId].name){ //name already exists in room
            return true
        }
    }
    return false
}

// function updateMemberVote(memberId, )

io.on('connection', (socket) => {
    console.log(`A user connected with id: ${socket.id}`);
    
    socket.on('save-name', (name) => {
        console.log(`entered name is ${name}`)
    })
    
    socket.on('join-room', (roomId, displayName) => {
        if(isDuplicate(roomId, displayName)){
            // Emit the event to the specific socket ID
            io.to(socket.id).emit('duplicate-name', displayName);
        }
        else{
            console.log(`${displayName} wanted to enter room id ${roomId}`)
            socket.join(roomId)
            
            addMemberToRoom(roomId, displayName, socket.id); //add member to stored rooms obj
            
            // Emit an event to notify all clients in the room about the updated member list
            const updatedMembers = rooms[roomId]    //object containing all the member objects
            io.to(roomId).emit('updateMembers', updatedMembers);
            
            socket.to(roomId).emit('recieve-room-message', `hi from ${displayName}`)    //sends entry msg to everyone else already present in the room
        }
    })

    socket.on('user-voted', (vote, roomId) => {
        // if(vote === null){  //user toggled off their score => show as not voted yet

        // }else{  //show as user has voted

        // }
        //updateMemberVote(socket.id, vote)
        console.log(`user in room ${roomId} has voted : ${vote}`)
    })

    socket.on('disconnecting', () => {
        const socketRooms = socket.rooms;

        socketRooms.forEach((roomId) => {
            if (roomId !== socket.id) { //  remove from every room other than own id room
                removeMemberFromRoom(roomId, socket.id)

                //Emit an event to notify other clients
                const updatedMembers = rooms[roomId] 
                io.to(roomId).emit('updateMembers', updatedMembers);
                
                socket.leave(roomId);
            }
        });

        console.log(`Socket ${socket.id} is disconnecting`);
      });
})


//     socket.on('vote', (vote) => {
//         // Store user's vote and emit updated members list
//         const room = Object.keys(socket.rooms)[1]; // Get the room name
//         const index = rooms[room].indexOf(socket.displayName);
//         rooms[room][index] = `${socket.displayName} (Voted: ${vote})`;
//         io.to(room).emit('members', rooms[room]);
//     });

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

