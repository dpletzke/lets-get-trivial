import { useState, useEffect } from "react";
import { LAG_BEFORE_SEND_ANSWER, SCOREBOARD_LAG } from "../constants.js";

export default function useGameData(gameId, connection) {
  const initialGame = {
    started: false,
    questions: [],
    players: [],
    params: { numQuestions: 5, timeLimit: 10 },
    currentQ: 0,
    whenToShowNextQuestion: null,
    whenToGoToLobby: null,
  };

  const [game, setGame] = useState(initialGame);
  const [view, setView] = useState("SCORE");
  // separate the fields of game into their own useStates

  // add an useEffect here for just observing "view"
  // when "view" changes, check if it's value is SCORE, if so,
  // create a setTimeout to change to the next view QUESTION

  useEffect(() => {
    if (view === "SCORE" || view === "STARTING") {
      setTimeout(() => {
        setView("QUESTION");
      }, SCOREBOARD_LAG);
    }
  }, [view]);

  useEffect(() => {
    console.log("game state has changed to: ", game);
  }, [game]);

  const setOptions = (options) => {

    /* checks if option is number or percentage string and converts */
    const isNumber = typeof(options.numCorrect) === 'number';
    const numCorrect = isNumber ? options.numCorrect : Number(options.numCorrect.slice(0, -1)) / 100;

    options.numCorrect = numCorrect; 
    setGame({ ...game, params: options });
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
    //separate setters --> move view into different state
    // setGameplayView: function (time) {
    //   setGame({ ...game, view: "SCORE" });
    //   // this just renders scoreboard
    //   const showScoreboardThisLong = time - Date.now();

    //   // setTimeout(() => {
    //   for (let i = 0; i < 99999999999; i++) {}
    //   setGame({ ...game, view: "QUESTION" });
    //   // }, showScoreboardThisLong);
    // },
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
      setView("STARTING");
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
      console.log("Next question!");
      const { players, currentQ, whenToShowNextQuestion } = data;

      console.log(`${gameId} moved to question ${currentQ}, starting Timeout`);
      const timer = await setTimeout(() => {
        setView("SCORE");
        setGame((prev) => {
          return { ...prev, currentQ, players, whenToShowNextQuestion };
        });
        clearTimeout(timer);
      }, LAG_BEFORE_SEND_ANSWER);
    });

    connection.current.on("game_ended", async (data) => {
      const { whenToGoToLobby } = data;

      console.log(`${gameId} ended from server!`);
      setView("FINISHED");
      const timer = setTimeout(() => {
        setGame((prev) => ({ ...prev, started: false, currentQ: 0 }));
        clearTimeout(timer);
      }, SCOREBOARD_LAG);
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
    view,
    setView,
  };
}
