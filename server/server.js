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

const rooms = {};

io.on('connection', (socket) => {
  console.log('a user connected');
  
  let user = ikea.getName(false);
  console.log(user);

  socket.emit('initial',{name: user, users:[]});
  console.log("On initial:", rooms);

  // made user name
  socket.user = user;
  
  socket.on('room', function(room) {
    
    socket.room = room;

    if (!rooms[room]) rooms[room] = [];
    rooms[room].push(user);

    console.log('On join room:', rooms);

    socket.join(room);

    // when anyone connects, NOTIFY EVERYONE WHO's in this room that someone else has connected, send the full list of users with new user
    io.in(room).emit('user_connected', { users:rooms[room] });
  });

  socket.on('change_name', (newName) => {

    const position = rooms[socket.room].findIndex(name => name === socket.user);
    const users = rooms[socket.room].splice(position, 1, newName);

    console.log('On change name:', socket.user, newName, rooms);

    io.in(socket.room).emit('user_connected', { users });

  });


  socket.on('disconnect', () => {
    console.log("user has disconnected!");
    console.log('DISCONNECTED USER, ', socket.user);

    console.log('Before disconnect', socket.room, rooms);

    const position = rooms[socket.room].findIndex(name => name === socket.user);
    const users = rooms[socket.room].splice(position, 1);
    socket.to(socket.room).emit('user_disconnected', { users });

  });
});



// STEP 5 - server.listen instead of app.listen!
server.listen(PORT, () => console.log('Server is listening on ', PORT));