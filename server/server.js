const express = require("express");
// STEP 1 get socket.io required
const socketio = require("socket.io");
// STEP 2 require HTTP into our server.
const http = require("http");
const PORT = 8080;

const app = express();
// STEP 3 wrap http with app
const server = http.createServer(app);

// STEP 4 wrap socket with server above
const io = socketio(server);

const {
  getCategories,
  getQuestions,
  getSessionToken,
} = require("../client/src/api/opentdb");

// reference to in-memory database and constants file
const ds = require("./data");
const {
  TIME_BETWEEN_QUESTIONS,
  DEFAULT_NUM_CORRECT,
  POINTS_SYSTEM,
  POINT_PENALTY,
} = require('./constants');

// TODO: do we need these?
// const { stringify } = require("querystring");

// app.get("/", (req, res) => {
//   res.json({ status: "ok" });
// });

io.on("connection", (socket) => {
  const user = ds.createUser({ socket });

  socket.on("join_room", function (name, roomId) {
    /* set name and roomId in data */
    user.name = name;
    user.roomId = roomId;

    /* reference or create room and push user to users array */
    const room =
      ds.rooms[roomId] || ds.createRoom({ roomId, hostId: socket.id });
    room.users.push(socket.id);

    socket.join(roomId);

    /* gets array of user in room */
    const payload = {
      users: room.users.map((id) => {
        const userPayload = { ...ds.users[id] };
        delete userPayload.socket;
        return userPayload;
      }),
    };
    console.log("Join user", name, "to", roomId);
    io.in(roomId).emit("user_connected", payload);
  });

  socket.on("get_room_info", () => {
    const roomInfo = Object.values(ds.rooms).map(r => {
      return ({roomId: r.roomId, started: r.status.started});
    });
    socket.emit("room_info", { roomInfo });
  });

  socket.on("start_game", async(data) => {
    const { params } = data;

    const user = ds.users[socket.id];
    const room = ds.getRoomFromUserId(socket.id);

    /* if room has token, check stale and refresh or generate new if no token */
    const tokenRes = await getSessionToken(room.token);
    console.log(`${tokenRes.response_message} for ${user.roomId}`);
    const token = tokenRes.token;

    /* add token and params to room */
    room.token = token;
    room.params = params;

    /* request questions with token and params and add to room */
    const questionsRes = await getQuestions(params, token);
    const questions = questionsRes.results;
    room.questions = questions;

    /* start the game status */
    room.status.started = true;

    /* log rooms the socket is in to server, should just be one */
    /* the first room is it's socketId, hence the slice */
    const printRooms = Object.values(socket.rooms).slice(1).join(" ");
    console.log(`Server starting ${printRooms} with:`);
    console.log(`${JSON.stringify(params)}`);
    console.log("");

    const payload = {
      questions,
      params,
      whenToShowNextQuestion: Date.now() + TIME_BETWEEN_QUESTIONS,
    };

    io.in(room.roomId).emit("game_started", payload);
  });

  socket.on("picked_answer", (data) => {
    const { correct, difficulty } = data;

    const user = ds.users[socket.id];
    const room = ds.getRoomFromUserId(socket.id);

    console.log(`${user.name} picked a ${correct ? "right" : "wrong"} answer`);

    const enoughCorrect = ds.checkEnoughCorrect(room, DEFAULT_NUM_CORRECT);

    /* award points */
    const points = POINTS_SYSTEM[difficulty.toLowerCase()];
    const pointsEarned = correct && !enoughCorrect ? points : POINT_PENALTY;
    user.score += pointsEarned;

    /* create and save record */
    const answer = {
      userId: socket.id,
      qIndex: room.status.currentQ,
      name: user.name,
      score: user.score,
      pointsEarned,
      correctAnswer: correct,
    };

    room.status.answers.push(answer);

    /* determine if enough have answered correctly before moving on */
    const enoughCorrectNow = ds.checkEnoughCorrect(room, DEFAULT_NUM_CORRECT);

    /* determine if everyone has answered and we should move on */
    const allAnswered = room.status.answers.length === room.users.length;

    if (enoughCorrectNow || allAnswered) {
      const reason = enoughCorrectNow
        ? "enough got it right"
        : allAnswered
        ? "everybody answered"
        : "time ran out";
      console.log(`Moving on for ${room.roomId} because ${reason}`);

      /* create scores list and reset answers */
      const players = ds.generateScoreboard(room);
      room.status.answers = [];

      /* if next question exists instruct next question */
      /* otherwise, send game ended */
      if (room.questions[room.status.currentQ + 1]) {
        const payload = {
          players,
          currentQ: room.status.currentQ + 1,
          whenToShowNextQuestion: Date.now() + TIME_BETWEEN_QUESTIONS,
        };

        io.in(room.roomId).emit("next_question", payload);

        room.status.currentQ = room.status.currentQ + 1;
      } else {
        const payload = {
          players,
          currentQ: null,
          whenToGoToLobby: Date.now() + TIME_BETWEEN_QUESTIONS,
        };

        console.log(`${room.roomId} ended`);
        io.in(room.roomId).emit("game_ended", payload);

        room.status.currentQ = null;
      }
    }
  });

  socket.on("disconnect", () => {
    const user = ds.users[socket.id];
    const room = ds.getRoomFromUserId(socket.id);

    if (user) {
      console.log(`Disconnect ${user.name}${room && ` from ${room.roomId}`}`);
      ds.destroyUser(socket.id);
    }

    if (room) {
      /* find position of user in array and remove by mutation */
      const position = room.users.findIndex((id) => id === socket.id);
      room.users.splice(position, 1);

      /* remove socket information from users sent to client */
      const payload = {
        users: room.users.map((id) => {
          const userPayload = { ...ds.users[id] };
          delete userPayload.socket;
          return userPayload;
        }),
      };

      io.in(room.roomId).emit("user_disconnected", payload);
    }
  });
});

// STEP 5 - server.listen instead of app.listen!
server.listen(PORT, () => console.log("Server is listening on ", PORT));
