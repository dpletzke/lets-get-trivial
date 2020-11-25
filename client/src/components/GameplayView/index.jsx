import { useState, useEffect } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import GameplayHeader from "./GameplayHeader";
import ActiveQuestion from "./Question";
import Scoreboard from "./Scoreboard";
import useVisualMode from "../../hooks/useVisualMode";

function GameplayView(props) {
  const {
    questions,
    currentQ,
    players,
    view,
    whenToShowNextQuestion,
    whenToGoToLobby,
    setView,
  } = props;

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

  // const [mode, setMode] = useState(SCORE)

  // useEffect(() => {
  //   const timeout = whenToShowNextQuestion-Date.now();
  //   setMode(SCORE);
  //   setTimeout(() => {
  //     setMode(QUESTION)
  //   }, timeout)

  // }, [whenToShowNextQuestion])

  const passProps = {
    questionObj: questions[currentQ],
    questionIndex: currentQ + 1,
  };

  if (view === QUESTION) {
    return <ActiveQuestion {...passProps} />;
  }

  if (view === SCORE) {
    return <Scoreboard players={players} />;
  }

  return <h1>None of the above</h1>;
}

export default GameplayView;
