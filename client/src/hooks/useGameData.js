import { useState, useEffect } from "react";
import {
  LAG_BEFORE_SEND_ANSWER,
  SCOREBOARD_LAG,
  STARTPAGE_LAG,
} from "../constants.js";

export default function useGameData(gameId, connection, defaults) {
  const initialGame = {
    started: false,
    questions: [],
    players: [],
    params: { ...defaults },
    currentQ: 0,
  };

  const [game, setGame] = useState(initialGame);
  const [view, setView] = useState("");
  // separate the fields of game into their own useStates

  // add an useEffect here for just observing "view"
  // when "view" changes, check if it's value is SCORE, if so,
  // create a setTimeout to change to the next view QUESTION

  useEffect(() => {
    console.log(view, new Date().getSeconds());
    if (view === "SCORE") {
      setTimeout(() => {
        setView("QUESTION");
      }, SCOREBOARD_LAG);
    }
    if (view === "STARTING") {
      setTimeout(() => {
        setView("QUESTION");
      }, STARTPAGE_LAG);
    }
  }, [view]);

  useEffect(() => {
    console.log("game state has changed to: ", game);
  }, [game]);

  const setOptions = (options) => {
    setGame({ ...game, params: { ...options } });
  };

  const { params } = game;

  // these setters are being sent down to the option items
  // so they can set the params in state
  const setters = {
    setNumber: function (num) {
      if (params.numQuestions !== num) {
        setOptions({ ...params, numQuestions: num });
      } else {
        setOptions({ ...params, numQuestions: null });
      }
    },
    setCategory: function (catId) {
      if (params.categoryId !== catId) {
        setOptions({ ...params, categoryId: catId });
      } else {
        setOptions({ ...params, categoryId: null });
      }
    },

    // checks if the difficulty is easy, medium, or hard
    // and doesn't change the state if not
    setDifficulty: function (difficulty) {
      const validOptions = ["Easy", "Medium", "Hard", "Mixed"];
      if (
        validOptions.find((el) => el === difficulty) &&
        params.difficulty !== difficulty
      ) {
        setOptions({ ...params, difficulty: difficulty });
      } else {
        setOptions({ ...params, difficulty: null });
      }
    },

    setQuestionTimeLimit: function (time) {
      if (params.timeLimit !== time) {
        setOptions({ ...params, timeLimit: time });
      } else {
        setOptions({ ...params, timeLimit: null });
      }
    },

    // setNumberCorrect: function (num) {
    //   if (params.numCorrect !== num) {
    //     setOptions({ ...params, numCorrect: num });
    //   } else {
    //     setOptions({ ...params, numCorrect: null });
    //   }
    // },
  };

  const startGame = () => {
    const { params } = game;
    console.log(`Start ${gameId} request sent to server!`);
    connection.current.emit("start_game", { params });
  };

  useEffect(() => {
    connection.current.on("game_started", (data) => {
      const { questions, params } = data;
      console.log("Hey its the data:", data);
      if (questions.length === 0 || !questions) {
        alert(
          "We were unable to generate enough questions with your specified settings. Please try changing the settings."
        );
        return;
      }

      setView("STARTING");
      setGame((prev) => {
        return {
          ...prev,
          questions,
          started: true,
          params,
        };
      });
    });

    connection.current.on("next_question", async (data) => {
      console.log("Next question!");
      const { players, currentQ } = data;

      console.log(`${gameId} moved to question ${currentQ}, starting Timeout`);
      const timer = await setTimeout(() => {
        setView("SCORE");
        setGame((prev) => {
          return { ...prev, currentQ, players };
        });
        clearTimeout(timer);
      }, LAG_BEFORE_SEND_ANSWER);
    });

    connection.current.on("game_ended", (data) => {
      const { players } = data;

      console.log(`${gameId} ended from server!`);
      setView("SCORE");
      const timer = setTimeout(() => {
        setGame((prev) => ({ ...prev, started: false, players, currentQ: 0 }));
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
