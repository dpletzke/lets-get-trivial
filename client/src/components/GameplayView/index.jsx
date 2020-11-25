import GameplayHeader from "./GameplayHeader";
import ActiveQuestion from "./Question";
import ScoreBoard from "./ScoreBoard";

const QUESTION = "QUESTION";
const SCORE = "SCORE";

// uncomment below after implementation of custom hook
// import useVisualMode from...
// const { mode } = useVisualMode(QUESTION)

function GameplayView(props) {
  const { questions, params, currentQ, players } = props;

  console.log({ players });

  const passProps = {
    questionObj: questions[currentQ],
    questionIndex: currentQ + 1,
  };

  return (
    <div>
      {currentQ <= 1 && <ActiveQuestion {...passProps} />}
      {/* uncomment below on implementation of visualMode */}
      {/* {mode === QUESTION && <Question/>}
      {mode === SCORE && <ShowScore/>} */}
      {currentQ > 1 && <ScoreBoard players={players} />}
    </div>
  );
}

export default GameplayView;
