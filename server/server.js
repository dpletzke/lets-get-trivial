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



io.on('connection', (socket) => {
  console.log('a user connected');
  console.log(ikea.getName(false));
  
  const rooms = {};

  // made user name
  let user = ikea.getName(false);
  const roomId = String(Math.floor(Math.random(2)) + 1);

  socket.on('room', function(room) {
    socket.join(room);
  });

  if (!rooms[roomId]) rooms[roomId] = [];
  rooms[roomId].push(user);

  console.log({rooms, roomId});
  
  // send user name to our connection client
  socket.user = user;
  socket.join(roomId);
  socket.emit('initial',{name: user, users:rooms[roomId]});
  
  // when anyone connects, NOTIFY EVERYONE WHO's connected that someone else has connected!
  // socket.broadcast.emit('user_connected', { users });
  socket.to(roomId).emit('user_connected', { users:rooms[roomId] });
  socket.on('greetings', data => {
    console.log("Message received");
    console.log(data);
  });

  // sending to all clients in 'game' room except sender
  //  socket.to('game').emit('nice game', "let's play a game");

  socket.on('disconnect', () => {
    console.log("user has disconnected!");
    console.log('DISCONNECTED USER, ', socket.user);
    // let position = users.indexOf(socket.user);

    const position = rooms[roomId].findIndex(socket.user);
    const users = rooms[roomId].splice(position, 1);
    io.emit('user_disconnected', {users});
  });
});



// STEP 5 - server.listen instead of app.listen!
server.listen(PORT, () => console.log('Server is listening on ', PORT));