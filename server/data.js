const rooms = {};
const users = {};

module.exports = {
  rooms,
  users,

  createUser: ({ socket, name, score }) => {
    if (!socket) throw new Error("tried to create user without a socket");
    if (!name) name = "";
    if (!score) score = 0;

    const user = {
      name,
      score,
    };

    users[socket.id] = user;

    return user;
  },

  createRoom: ({ roomId, hostId }) => {
    const room = {
      roomId,
      hostId,
      token: null,
      questions: [],
      users: [],
      // status resets after each question
      status: {
        //answers: each { name, score, pointsEarned, correctAnswer }
        answers: [],
        currentQ: null,
      },
      params: {
        timeLimit: 10,
        numQuestions: 10,
        categoryId: null,
        type: null,
        difficulty: null,
        numCorrect: null,
      },
    };

    rooms[roomId] = room;

    return room;
  },

  checkEnoughCorrect: (room, defaultVal) => {

    /* be sure that the right answers being counted are for this question */
    const rightAnswers = room.status.answers.filter((a) => {
      return a.correctAnswer &&  a.qIndex === room.status.currentQ;
    });
    const param = room.params.numCorrect || defaultVal;

    const isNumber = typeof(param) === 'number';
    const numCorrect = isNumber ? param : Number(param.slice(0, -1)) / 100;

    if (numCorrect >= 1) {
      return rightAnswers.length >= numCorrect;
    } else {
      const maxNumCorrect = Math.ceil(numCorrect * room.users.length);
      return rightAnswers.length >= maxNumCorrect;
    }
  },

  getRoomFromUserId: (userId) => {
    return Object.values(rooms).find((r) => {
      return r.users.includes(userId);
    });
  },

  generateScoreboard: (room) => {
    const userIdsWhoDidntAnswer = room.users.filter((userId) => {
      return !room.status.answers.find((a) => a.userId === userId);
    });

    const playersWhoDidntAnswer = userIdsWhoDidntAnswer.map((userId) => {
      const { name, score } = users[userId];
      return { name, score, pointsEarned: 0, correct: false };
    });

    return [...room.status.answers, ...playersWhoDidntAnswer];
  },

  destroyUser: (userId) => {
    console.log("Destroy user:", users[userId].name);
    console.log("");

    delete users[userId];
  },

  destroyRoom: (roomId) => {
    console.log("Destroy room:", roomId);
    console.log("");

    delete rooms[roomId];
  },
};
