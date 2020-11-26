import { useState, useEffect } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import GameplayHeader from "./GameplayHeader";
import ActiveQuestion from "./Question";
import Scoreboard from "./Scoreboard";
import StartGame from "./StartGame";
import useVisualMode from "../../hooks/useVisualMode";

function GameplayView(props) {
  const {
    questions,
    params,
    currentQ,
    players,
    view,
    whenToShowNextQuestion,
    whenToGoToLobby,
    setView,
  } = props;

  const { timeLimit } = params;
  // console.log("Params", params)

  // const { setGameplayView } = setters;

  console.log("Current Q: ", currentQ);

  // should settimeout  in the useEffect
  // useEffect(() => {
  //   setGameplayView(whenToShowNextQuestion);
  // }, [whenToShowNextQuestion]);

  // component shows scoreboard
  // after seTimeoutruns, component shows activequestion

  // const toggler = (whenToShowNextQuestion, whenToGoToLobby) => {
  //   if (currentTime < whenToShowNextQuestion) {
  //     return (<Scoreboard players={players} />)
  // } else

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
    return <StartGame />;
  }

  if (view === QUESTION) {
    return <ActiveQuestion {...passProps} />;
  }

  if (view === SCORE) {
    return <Scoreboard players={players} />;
  }
  //For Testing CSS on Score Page --> comment this in and above two views out
  // if (view === QUESTION) {
  //   return <Scoreboard players={players} />;
  // }
  if (view === FINISHED) {
    return (
      <h1>
        GAME DONE Y'ALL! HOPE YOU HAD SOME FUN! EVERYONE IS A WINNER IN MY
        HEART!
      </h1>
    );
  }
  return <h1>None of the above</h1>;
}

export default GameplayView;
