/* eslint-disable func-style */

const rooms = {};
const users = {};

function createUser({ socket, name, score }) {
  if (!socket) throw new Error("tried to create user without a socket");
  if (!name) name = "";
  if (!score) score = 0;

  const user = {
    id: socket.id,
    name,
    score,
  };

  users[socket.id] = user;

  return user;
}

function createRoom({ roomId, hostId }) {
  const room = {
    roomId,
    hostId,
    token: null,
    questions: [],
    users: [],
    status: {
      started: false,
      //answers: each { name, score, pointsEarned, correctAnswer }
      answers: [],
      currentQ: null,
      timer: null,
    },

    params: {
      timeLimit: null,
      numQuestions: null,
      categoryId: null,
      type: null,
      difficulty: null
    },
  };

  rooms[roomId] = room;

  return room;
}

function getRoomFromUserId(userId) {
  return Object.values(rooms).find((r) => {
    return r.users.includes(userId);
  });
}

function generateScoreboard(room) {

  const userIdsWhoDidntAnswer = room.users.filter((userId) => {
    return !room.status.answers.find((a) => a.userId === userId);
  });

  const playersWhoDidntAnswer = userIdsWhoDidntAnswer.map((userId) => {
    const { name, score } = users[userId];
    return { name, score, pointsEarned: 0, correct: false };
  });
  return [...room.status.answers, ...playersWhoDidntAnswer];
}



function createOrRefRoom(userId, roomId) {
  return rooms[roomId] || createRoom({ roomId, hostId: userId });
}

function getUsersInRoom(room) {
  return room.users.map((id) => {
    const userPayload = { ...users[id] };
    delete userPayload.socket;
    return userPayload;
  });
}

function removeUserFromRoom(userId, room) {
  const position = room.users.findIndex((id) => id === userId);
  room.users.splice(position, 1);
}


function destroyUser(userId) {

  console.log("Destroy user:", users[userId].name);
  console.log("");

  delete users[userId];
}

function destroyRoom(roomId) {
  console.log("Destroy room:", roomId);
  console.log("");

  delete rooms[roomId];
}

module.exports = {
  rooms,
  users,
  createUser,
  createRoom,
  getRoomFromUserId,
  generateScoreboard,
  getUsersInRoom,
  createOrRefRoom,
  removeUserFromRoom,
  destroyUser,
  destroyRoom,

};
