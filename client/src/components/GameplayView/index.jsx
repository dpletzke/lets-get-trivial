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
<<<<<<< HEAD
  const { questions, currentQ, players, view, whenToShowNextQuestion } = props;
  console.log('Current Q: ', currentQ);
  const SCORE = 'SCORE';
  const QUESTION = 'QUESTION';

  const [mode, setMode] = useState(SCORE)


  useEffect(() => {
    const timeout = whenToShowNextQuestion-Date.now();
    setMode(SCORE);
    setTimeout(() => {
      setMode(QUESTION)
    }, timeout)



  }, [whenToShowNextQuestion])

  // if(view === 'SCORE'){

  // } else if (view === 'QUESTION'){


  // }
  // }

  // if (Date.now() < whenToShowNextQuestion) {
  //   setMode('SCORE')
  // }
//   if (mode === QUESTION) {
//     const whenToShowNextQuestion = Date.now() + 5000;
//     const timeOut = whenToShowNextQuestion - Date.now();
//     setTimeout(setMode, timeOut, SCORE);
// }

//   // next question! give it five seconds

//   if (mode === SCORE) {
//     const whenToShowNextQuestion = Date.now() + 5000;
//     const timeOut = whenToShowNextQuestion - Date.now();
//     setTimeout(setMode, timeOut, QUESTION);
// }



=======
  const {
    questions,
    params,
    currentQ,
    players,
    whenToShowNextQuestion,
    whenToGoToLobby
  } = props;
>>>>>>> 5adb748d13a2db66296b1142c80f8938a72d1d98

  const passProps = {
    questionObj: questions[currentQ],
    questionIndex: currentQ + 1,
  };




  return (
    <div>
      {mode === QUESTION && <ActiveQuestion {...passProps} />}

      {mode === SCORE && <Scoreboard players={players} />}
      {/* <ActiveQuestion {...passProps} /> */}
    </div>
  );
}

export default GameplayView;
