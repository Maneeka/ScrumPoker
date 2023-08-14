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
const { Socket } = require('dgram');

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

io.on('connection', (socket) => {
    console.log(`A user connected with id: ${socket.id}`);
    socket.on('name', (name) => {
        console.log(`entered name is ${name}`)
    })
})

// Store room data
// const rooms = {}; // roomId : {members:[], votes: {}}

// io.on('connection', (socket) => {
//     console.log(`A user connected with id: ${socket.id}`);

//     socket.on('join', ({displayName, roomId} ) => {
//         socket.join(roomId);

//         if (!rooms[roomId]) {
//             rooms[roomId] = {members: [], votes: {}};
//         }
//         rooms[roomId].members.push(displayName);

//         io.to(roomId).emit('members', rooms[roomId]);
//     });

//     socket.on('vote', (vote) => {
//         // Store user's vote and emit updated members list
//         const room = Object.keys(socket.rooms)[1]; // Get the room name
//         const index = rooms[room].indexOf(socket.displayName);
//         rooms[room][index] = `${socket.displayName} (Voted: ${vote})`;
//         io.to(room).emit('members', rooms[room]);
//     });

//     socket.on('disconnect', () => {
//         console.log('A user disconnected');

//         // Remove user from the room members list
//         const room = Object.keys(socket.rooms)[1];
//         const index = rooms[room].indexOf(socket.displayName);
//         if (index !== -1) {
//         rooms[room].splice(index, 1);
//         io.to(room).emit('members', rooms[room]);
//         }
//     });
// });

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

