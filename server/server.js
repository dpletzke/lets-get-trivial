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

const { rooms, users, createRoom, createUser } = require('./data');


// const ikea = require('ikea-name-generator');

app.get('/', (req, res) => {
  res.json({status: 'ok'});
});

// const rooms = {};

// rooms object with all rooms containing users - add boolean for public/private

io.on('connection', (socket) => {
  
  createUser({ socket });
  
  socket.on('join_room', function(name, gameId) {
    let roomId = gameId;
    users[socket.id].name = name;
    socket.name = name;

    if (!rooms[roomId]) {
      roomId = createRoom({ roomId, userId:socket.id }).roomId;
      // socket.emit('room_created', roomId);
    } else {
      rooms[roomId].users.push(socket.id);
    }

    users[socket.id].roomId = roomId;
    socket.roomId = roomId;



  
    // if (!rooms[room]) rooms[room] = [];
    // rooms[room].push(user);

    // console.log('On join room:', rooms);

    socket.join(roomId);

    console.log(rooms);
    /* gets array of user names in room */
    const payload = {
      users: rooms[roomId].users.map(id => {
        console.log(id, users);
        return users[id].name;
      })
    };

    io.in(roomId).emit('user_connected', payload);
  });

  // socket.on('change_name', (newName) => {

  //   const position = rooms[socket.room].findIndex(name => name === socket.user);
  //   rooms[socket.room].splice(position, 1, newName);

  //   io.in(socket.room).emit('user_connected', { users:rooms[socket.room] });
  // });


  socket.on('disconnect', () => {

    console.log({rooms, roomId: socket.roomId});

    /* find position of user in array and remove by mutation */
    const position = rooms[socket.roomId]
                                 .users
                                 .findIndex(id => id === socket.id);
    rooms[socket.roomId].users.splice(position, 1);

    const users = rooms[socket.roomId].users.map(id => users[id].name);

    socket.to(socket.roomId).emit('user_disconnected', { users });

  });
});

// STEP 5 - server.listen instead of app.listen!
server.listen(PORT, () => console.log('Server is listening on ', PORT));