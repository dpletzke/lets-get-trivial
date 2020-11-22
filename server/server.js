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


// reference to in-memory database
const data = require('./data');

app.get('/', (req, res) => {
  res.json({status: 'ok'});
});

io.on('connection', (socket) => {
  
  const user = data.createUser({ socket });
  
  socket.on('join_room', function(name, roomId) {

    /* set name and roomId in data */
    user.name = name;
    user.roomId = roomId;
    
    /* reference or create room and push user to users array */
    const room = data.rooms[roomId] || data.createRoom({ roomId });
    room.users.push(socket.id);

    socket.join(roomId);

    /* gets array of user names in room */
    const payload = {
      users: room.users.map(id => {
        const userPayload = {...data.users[id]};
        delete userPayload.socket;
        return userPayload;
      })
    };
    console.log('Join user', name, 'to', roomId);
    io.in(roomId).emit('user_connected', payload);
  });

  // socket.on('get_roomIds')

  // socket.on('change_name', (newName) => {

  //   const position = rooms[socket.room].findIndex(name => name === socket.user);
  //   rooms[socket.room].splice(position, 1, newName);

  //   io.in(socket.room).emit('user_connected', { users:rooms[socket.room] });
  // });


  socket.on('disconnect', () => {

    const user = data.users[socket.id];
    const room = Object.values(data.rooms).find(r => {
      return r.users.includes(socket.id);
    });

    if (user) {
      console.log(`Disconnect ${user.name}${room && ` from ${room.roomId}` }`);
      data.destroyUser(socket.id);
    }

    if (room) {

      /* find position of user in array and remove by mutation */
      const position = room.users.findIndex(id => id === socket.id);
      room.users.splice(position, 1);

      const payload = {
        users: room.users.map(id => data.users[id].name)
      };
      
      socket.to(room.roomId).emit('user_disconnected', payload);
    }
  });
});

// STEP 5 - server.listen instead of app.listen!
server.listen(PORT, () => console.log('Server is listening on ', PORT));