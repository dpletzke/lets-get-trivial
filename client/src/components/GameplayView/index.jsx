import { useState, useEffect } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import GameplayHeader from "./GameplayHeader";
import ActiveQuestion from "./Question";
import Scoreboard from "./Scoreboard";
import StartGame from "./StartGame";
import useVisualMode from "../../hooks/useVisualMode";

<<<<<<< HEAD
const { SHOW_SCOREBOARD } = require("../../config/settings");
=======
import {SCOREBOARD_LAG, STARTPAGE_LAG} from '../../constants';
// import { STARTPAGE_LAG } from "../../../../server/constants";
>>>>>>> master

function GameplayView(props) {
  const {
    questions,
    params,
    currentQ,
    players,
    view,
<<<<<<< HEAD
    setView,
    audioOn,
=======
  

>>>>>>> master
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
    return <StartGame time={STARTPAGE_LAG * .001 } audioOn={audioOn} />;
  }

  if (view === QUESTION) {
    return <ActiveQuestion {...passProps} audioOn={audioOn} />;
  }

  if (view === SCORE) {
    return <Scoreboard time={SCOREBOARD_LAG * .001 } view={view} players={players}  audioOn={audioOn} />;
  }
 
  if (view === FINISHED) {
    
      return <Scoreboard time={SCOREBOARD_LAG * .001 } view={view} players={players} audioOn={audioOn} />;
    
  }
  return <h1>None of the above</h1>;
}

export default GameplayView;
