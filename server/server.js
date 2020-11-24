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

const {
  getCategories,
  getQuestions,
  getSessionToken
} = require("../client/src/api/opentdb");

// reference to in-memory database
const ds = require('./data');

app.get('/', (req, res) => {
  res.json({status: 'ok'});
});

io.on('connection', (socket) => {
  
  const user = ds.createUser({ socket });
  
  socket.on('join_room', function(name, roomId) {

    /* set name and roomId in data */
    user.name = name;
    user.roomId = roomId;
    
    /* reference or create room and push user to users array */
    const room = ds.rooms[roomId] || ds.createRoom({ roomId });
    room.users.push(socket.id);

    socket.join(roomId);

    /* gets array of user in room */
    const payload = {
      users: room.users.map(id => {
        const userPayload = {...ds.users[id]};
        delete userPayload.socket;
        return userPayload;
      })
    };
    console.log('Join user', name, 'to', roomId);
    io.in(roomId).emit('user_connected', payload);
  });

  socket.on('get_roomIds', () => {

    socket.emit('roomIds', {roomIds: Object.keys(ds.rooms)});
  });

  socket.on('start_game', async data => {
    const { params } = data;

    /* retrieve token print response */
    const tokenRes = await getSessionToken();
    console.log(`${tokenRes.response_message} for ${user.roomId}`);
    const token = tokenRes.token;

    /* add token to room */
    const roomId = ds.users[socket.id].roomId;
    ds.rooms[roomId].token = token;

    /* request questions with token and params */
    const questionsRes = await getQuestions(params, token);
    const questions = questionsRes.results;

    /* log rooms the socket is in to server, should just be one */
    /* the first room is it's socketId, hence the slice */
    const serializeRooms = Object.values(socket.rooms).slice(1).join(' ');
    console.log(`Server starting ${serializeRooms}`);

    io.in(roomId).emit('game_started', { questions, params });
  });

  // socket.on('change_name', (newName) => {

  //   const position = rooms[socket.room].findIndex(name => name === socket.user);
  //   rooms[socket.room].splice(position, 1, newName);

  //   io.in(socket.room).emit('user_connected', { users:rooms[socket.room] });
  // });

  socket.on('picked_answer', data => {
    const { isCorrect, difficulty } = data;
    
    const user = ds.users[socket.id];
    const room = ds.getRoomFromUserId(socket.id);

    console.log(`${user.name} got a ${difficulty} question ${isCorrect ? 'right' : 'wrong'}`);

  });


  socket.on('disconnect', () => {

    const user = ds.users[socket.id];
    const room = ds.getRoomFromUserId(socket.id);

    if (user) {
      console.log(`Disconnect ${user.name}${room && ` from ${room.roomId}` }`);
      ds.destroyUser(socket.id);
    }

    if (room) {

      /* find position of user in array and remove by mutation */
      const position = room.users.findIndex(id => id === socket.id);
      room.users.splice(position, 1);

      const payload = {
        users: room.users.map(id => {
          const userPayload = {...ds.users[id]};
          delete userPayload.socket;
          return userPayload;
        })
      };

      socket.to(room.roomId).emit('user_disconnected', payload);
    }
  });
});

// STEP 5 - server.listen instead of app.listen!
server.listen(PORT, () => console.log('Server is listening on ', PORT));