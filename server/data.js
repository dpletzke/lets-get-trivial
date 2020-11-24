

// users
/*each users object has key socket.id and the following form
socket.id :{
  socket,
  name,
  roomId,
  score,

}*/
// rooms
/* {
  roomId,
  categoryId,
  numQuestions= 10,
  difficulty= null
  
} */

const rooms = {};
const users = {};

module.exports = {
  rooms,
  users,
 
  createUser:({ socket, name, score })=> {
    if (!socket) throw new Error('tried to create user without a socket');
    if (!name) name = '';
    if (!score) score = 0;

    const user = {
      socket,
      name,
      score
    };

    users[socket.id] = user;

    return user;
  },

  createRoom:({ roomId, userId, token, categoryId, numQuestions, type }) => {

    const room = {
      roomId,
      creatorId: userId,
      token,
      categoryId,
      numQuestions,
      type,
      questions: [],
      users: []
    };

    rooms[roomId] = room;

    return room;

  },

  getRoomFromUserId:(userId) => {
    return Object.values(rooms).find(r => {
      return r.users.includes(userId);
    });
  },

  destroyUser:(userId) => {
    console.log('Destroy user:', users[userId].name);
    console.log('');

    delete users[userId];
  },

  destroyRoom:(roomId) => {
    delete rooms[roomId];
  }

};