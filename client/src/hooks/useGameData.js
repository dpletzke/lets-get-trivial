import { useState, useEffect } from "react";
import { LAG_BEFORE_SEND_ANSWER } from "../constants.js";

export default function useGameData(gameId, connection) {
  const initialGame = {
    started: false,
    questions: [],
    players: [],
    params: { numQuestions: 5 },
    currentQ: 0,
    whenToShowNextQuestion: null,
    whenToGoToLobby: null,
  };

  const [game, setGame] = useState(initialGame);

  const setOptions = (options) => {
    setGame({ ...game, params: { ...options } });
  };

  const { params } = game;

  // these setters are being sent down to the option items
  // so they can set the params in state
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
      const { questions, params, whenToShowNextQuestion } = data;

      const startTime = (whenToShowNextQuestion - Date.now()) / 1000;
      console.log(`${gameId} to show first question in ${startTime} seconds`);

      setGame((prev) => {
        return {
          ...prev,
          questions,
          started: true,
          params,
          whenToShowNextQuestion,
        };
      });
    });

    connection.current.on("next_question", async (data) => {
      const { players, currentQ, whenToShowNextQuestion } = data;

      console.log(`${gameId} moved to question ${currentQ}, starting Timeout`);
      const timer = await setTimeout(() => {

        setGame((prev) => {
          return { ...prev, currentQ, players, whenToShowNextQuestion };
        });
        clearTimeout(timer);
      }, LAG_BEFORE_SEND_ANSWER);
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
