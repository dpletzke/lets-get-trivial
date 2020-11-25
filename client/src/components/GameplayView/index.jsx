import GameplayHeader from "./GameplayHeader";
import ActiveQuestion from "./Question";
import Scoreboard from "./Scoreboard";

const QUESTION = "QUESTION";
const SCORE = "SCORE";

// uncomment below after implementation of custom hook
// import useVisualMode from...
// const { mode } = useVisualMode(QUESTION)

function GameplayView(props) {
  const { questions, params, currentQ, players, whenToShowNextQuestion } = props;

// when date.now() > whenToShowNextQuestion// then render next question
// else show scoreboard 
// reset whenToShowNextQuestion 

  console.log({ players });

  const passProps = {
    questionObj: questions[currentQ],
    questionIndex: currentQ + 1,
  };

  return (
    <div>
      {currentQ <= 0 && <ActiveQuestion {...passProps} />}
      {/* uncomment below on implementation of visualMode */}
      {/* {mode === QUESTION && <Question/>}
      {mode === SCORE && <ShowScore/>} */}
      {currentQ > 0 && <Scoreboard players={players} />}
    </div>
  );
}

export default GameplayView;
