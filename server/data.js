

// users
/*{
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
  difficulty= null,
  
} */

// const makeId = (length) => {
//   let result     = '';
//   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//   const charactersLength = characters.length;
//   for (let i = 0; i < length; i++) {
//     result += characters.charAt(Math.floor(Math.random() * charactersLength));
//   }
//   return result;
// };

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

  createRoom:({ roomId, userId, categoryId, numQuestions, type }) => {

    const room = {
      roomId,
      userId,
      categoryId,
      numQuestions,
      type,
      questions: [],
      users: [userId],
    };

    rooms[roomId] = room;

    return room;

  }
};