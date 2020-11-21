const express = require('express');
// STEP 1 get socket.io required
const socketio = require('socket.io');
// STEP 2 require HTTP into our server.
const http = require('http');
const PORT = 8080;

const app = express();
// STEP 3 wrap http with app
const server = http.createServer(app);

// STEP 4 wrap socket with server above
const io = socketio(server);


const ikea = require('ikea-name-generator');

app.get('/', (req, res) => {
  res.json({status: 'ok'});
});

// app.get('/:roomId', (req, res) => {
//   roomId = req.params.roomId;
//   console.log(req.params);
//   res.json({status: 'ok'});
// });


const rooms = {};

io.on('connection', (socket) => {
  console.log('a user connected');
  console.log(ikea.getName(false));
  
  let user = ikea.getName(false);

  socket.emit('initial',{name: user, users:[]});

  // made user name
  socket.user = user;
  
  // sending to all clients in 'game' room, including sender
  //  io.in('game').emit('big-announcement', 'the game will start soon');
  
  socket.on('room', function(room) {
    
    console.log(room);
    socket.room = room;

    if (!rooms[room]) rooms[room] = [];
    rooms[room].push(user);

    socket.join(room);
    console.log({room, rooms});
    io.in(room).emit('user_connected', { users:rooms[room] });
  });

  // io.in('game').emit('big-announcement', 'the game will start soon');



    // send user name to our connection client
  
  // when anyone connects, NOTIFY EVERYONE WHO's connected that someone else has connected!
  // socket.broadcast.emit('user_connected', { users });
  socket.on('greetings', data => {
    console.log("Message received");
    console.log(data);
  });

  // sending to all clients in 'game' room except sender
  //  socket.to('game').emit('nice game', "let's play a game");

  socket.on('disconnect', () => {
    console.log("user has disconnected!");
    console.log('DISCONNECTED USER, ', socket.user);

    const position = rooms[socket.room].findIndex(name => name === socket.user);
    const users = rooms[socket.room].splice(position, 1);
    socket.to(socket.room).emit('user_disconnected', { users });

    // io.emit('user_disconnected', {users});
  });
});



// STEP 5 - server.listen instead of app.listen!
server.listen(PORT, () => console.log('Server is listening on ', PORT));