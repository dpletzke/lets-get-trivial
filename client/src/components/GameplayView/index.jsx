import { useState, useEffect } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import GameplayHeader from "./GameplayHeader";
import ActiveQuestion from "./Question";
import Scoreboard from "./Scoreboard";
import StartGame from "./StartGame";
import useVisualMode from "../../hooks/useVisualMode";

import {SCOREBOARD_LAG, STARTPAGE_LAG} from '../../constants';
// import { STARTPAGE_LAG } from "../../../../server/constants";

function GameplayView(props) {
  const {
    questions,
    params,
    currentQ,
    players,
    view,
  

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
    return <StartGame time={STARTPAGE_LAG * .001 } />;
  }

  if (view === QUESTION) {
    return <ActiveQuestion {...passProps} />;
  }

  if (view === SCORE) {
    return <Scoreboard time={SCOREBOARD_LAG * .001 } view={view} players={players} />;
  }
  //For Testing CSS on Score Page --> comment this in and above two views out
  // if (view === QUESTION) {
  //   return <Scoreboard players={players} />;
  // }
  if (view === FINISHED) {
    
      return <Scoreboard time={SCOREBOARD_LAG * .001 } view={view} players={players} />;
    
  }
  return <h1>None of the above</h1>;
}

export default GameplayView;
