
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
      name,
      score
    };

    users[socket.id] = user;

    return user;
  },

  createRoom:({ roomId, hostId }) => {

    const room = {
      roomId,
      hostId,
      token: null,
      questions: [],
      users: [],
      status:{
        //each player answer { name, score, pointsEarned, correctAnswer }
        answers: [],
        currentQ: null
      },
      params: {
        questionTime: 15000,
        categoryId: null,
        numQuestions: null,
        type: null,
        difficulty: null,
        numberCorrect: null
      }
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
    console.log('Destroy room:', roomId);
    console.log('');

    delete rooms[roomId];
  }

};