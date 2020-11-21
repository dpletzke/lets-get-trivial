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

const { rooms, users,  } = require('./data'); 


const ikea = require('ikea-name-generator');

app.get('/', (req, res) => {
  res.json({status: 'ok'});
});



// rooms object with all rooms containing users - add boolean for public/private

io.on('connection', (socket) => {
  
  let user = ikea.getName(false);
  // console.log(`a user connected: ${user}`);

  socket.emit('initial',{name: user, users:[]});
  // console.log("On initial:", rooms);

  //set name as user on socket object
  socket.user = user;
  
  socket.on('join_room', function(room) {
    
    socket.room = room;

    if (!rooms[room]) rooms[room] = [];
    rooms[room].push(user);

    // console.log('On join room:', rooms);

    socket.join(room);

    io.in(room).emit('user_connected', { users:rooms[room] });
  });

  socket.on('change_name', (newName) => {

    const position = rooms[socket.room].findIndex(name => name === socket.user);
    rooms[socket.room].splice(position, 1, newName);

    io.in(socket.room).emit('user_connected', { users:rooms[socket.room] });
  });


  socket.on('disconnect', () => {

    /* find position of user in array and remove by mutation */
    const position = rooms[socket.room].findIndex(name => name === socket.user);
    rooms[socket.room].splice(position, 1);

    const users = rooms[socket.room];

    socket.to(socket.room).emit('user_disconnected', { users });

  });
});

// STEP 5 - server.listen instead of app.listen!
server.listen(PORT, () => console.log('Server is listening on ', PORT));