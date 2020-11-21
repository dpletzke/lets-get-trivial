

// users
/*{
  socket,
    socket.name
    socket.roomId
  score,

}*/
// rooms
/* {
  roomId,
  categoryId,
  numQuestions= 10,
  difficulty= null,



} */

const makeId = (length) => {
  let result     = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

module.exports = {
  rooms:{},
  users:{},

  createUser:({ socket, name, score })=> {
    if (!socket) throw new Error('tried to create user without a socket');
    if (!name) throw new Error('tried to create user without a name');
    if (!score) score = 0;

    const user = {
      socket,
      name,
      score
    };

    this.users[socket.id] = user;

    return user;
  },
  createRoom:({ categoryId, numQuestions, type, }) => {



    this.rooms[makeId(6)];

  },
  addUserToRoom: {

  }
};