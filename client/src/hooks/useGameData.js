import { useState, useEffect, useContext } from "react";

export default function useGameData(gameId, connection) {
  const initialGame = {
    started: false,
    questions: [],
    params: { numQuestions: 5 },
    currentQ: 0,
  };

  const [game, setGame] = useState(initialGame);

  const setOptions = (options) => {
    setGame({ ...game, params: { ...options } });
  };

  const { params } = game;

  const setters = {
    setNumber: function (num) {
      setOptions({ ...params, numQuestions: num });
    },
    setCategory: function (catId) {
      console.log({ catId });
      setOptions({ ...params, categoryId: catId });
    },

    // checks if the difficulty is easy, medium, or hard
    // and doesn't change the state if not
    setDifficulty: function (difficulty) {
      const validOptions = ["Easy", "Medium", "Hard"];
      if (validOptions.find((el) => el === difficulty)) {
        setOptions({ ...params, difficulty: difficulty });
      } else {
        setOptions({ ...params, difficulty: null });
      }
    },

    setQuestionTimeLimit: function (time) {
      setOptions({ ...params, timeLimit: time });
    },
    setNumberCorrect: function (num) {
      setOptions({ ...params, numCorrect: num });
    },
  };

  const startGame = () => {
    const { params } = game;
    console.log(`Start ${gameId} request sent to server!`);
    connection.current.emit("start_game", { params });
  };

  useEffect(() => {
    connection.current.on("game_started", (data) => {
      const { questions, params } = data;
      console.log(data);

      console.log(`${gameId} started from server!`);
      setGame((prev) => ({ ...prev, questions, started: true, params }));
    });

    connection.current.on("next_question", async (data) => {
      const { namesCorrect, currentQ } = data;

      console.log("Server sent next Q, starting timeout");
      const timer = await setTimeout(() => {
        console.log(`${gameId} moved to question ${currentQ} from server!`);
        setGame((prev) => ({ ...prev, currentQ }));
        clearTimeout(timer);
      }, 2000);
    });

    connection.current.on("game_ended", (data) => {
      console.log(`${gameId} ended from server!`);
      setGame((prev) => ({ ...prev, started: false, currentQ: 0 }));
    });

    const oldConnection = connection.current;

    return () => {
      oldConnection.removeAllListeners("game_started");
      oldConnection.removeAllListeners("next_question");
      oldConnection.removeAllListeners("game_ended");
    };
  }, [connection, gameId]);

  return {
    game,
    startGame,
    setters,
  };
}
