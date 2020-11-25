import {useState, useEffect} from 'react';
import { FaQuestionCircle } from "react-icons/fa";
import GameplayHeader from "./GameplayHeader";
import ActiveQuestion from "./Question";
import Scoreboard from "./Scoreboard";
import useVisualMode from '../../hooks/useVisualMode';

// const QUESTION = "QUESTION";
// const SCORE = "SCORE";

// uncomment below after implementation of custom hook
// import useVisualMode from...
// const { mode } = useVisualMode(QUESTION)

// getting some kind of message from the server when scoreview
// timer is run out

// some kind of message when question has been answered by
// enough players || timer has run out





function GameplayView(props) {
  const { questions, currentQ, players, view, whenToShowNextQuestion, whenToGoToLobby, setters } = props;

  const {setGameplayView} = setters

  console.log('Current Q: ', currentQ);

  useEffect(() => {
    setGameplayView(whenToShowNextQuestion);
  }, [whenToShowNextQuestion]);

  // component shows scoreboard
  // after seTimeoutruns, component shows activequestion

  // const toggler = (whenToShowNextQuestion, whenToGoToLobby) => {
  //   if (currentTime < whenToShowNextQuestion) {
  //     return (<Scoreboard players={players} />)
  // } else 


  const SCORE = 'SCORE';
  const QUESTION = 'QUESTION';

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




  return (
    <div>
      {view === QUESTION && <ActiveQuestion {...passProps} />}

      {view === SCORE && <Scoreboard players={players} />}
    </div>
  );
}

export default GameplayView;
