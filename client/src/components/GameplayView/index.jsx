import { useState, useEffect } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import GameplayHeader from "./GameplayHeader";
import ActiveQuestion from "./Question";
import Scoreboard from "./Scoreboard";
import StartGame from "./StartGame";
import useVisualMode from "../../hooks/useVisualMode";

const { SHOW_SCOREBOARD } = require("../../config/settings");

function GameplayView(props) {
  const {
    questions,
    params,
    currentQ,
    players,
    view,
    setView,
    audioOn,
  } = props;

  const { timeLimit } = params;
  // console.log("Params", params)

  // const { setGameplayView } = setters;

  console.log("Current Q: ", currentQ);

  const SCORE = "SCORE";
  const QUESTION = "QUESTION";
  const STARTING = "STARTING";
  const FINISHED = "FINISHED";

  const passProps = {
    questionObj: questions[currentQ],
    questionIndex: currentQ + 1,
    timeLimit,
  };

  if (view === STARTING) {
    return <StartGame audioOn={audioOn} />;
  }

  if (view === QUESTION) {
    return <ActiveQuestion {...passProps} audioOn={audioOn} />;
  }

  if (view === SCORE) {
    return (
      <Scoreboard
        time={SHOW_SCOREBOARD}
        view={view}
        players={players}
        audioOn={audioOn}
      />
    );
  }
  //For Testing CSS on Score Page --> comment this in and above two views out
  // if (view === QUESTION) {
  //   return <Scoreboard players={players} />;
  // }
  if (view === FINISHED) {
    return (
      <Scoreboard
        time={SHOW_SCOREBOARD}
        view={view}
        players={players}
        audioOn={audioOn}
      />
    );
  }
  return <h1>None of the above</h1>;
}

export default GameplayView;
