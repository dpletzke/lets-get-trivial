import GameplayHeader from './GameplayHeader'
import ActiveQuestion from './Question'
import ShowScore from './ShowScore'

const QUESTION = 'QUESTION';
const SCORE = 'SCORE';

// uncomment below after implementation of custom hook
// import useVisualMode from...
// const { mode } = useVisualMode(QUESTION)

function GameplayView(props) {
  const { questions, params } = props;

  const questionsRunner = questions.map((q, i) => {
    return {...q, questionIndex: i + 1}
  });
  
  return (
    <div>
      <ActiveQuestion questionObj={questionsRunner[0]}/>
      {/* uncomment below on implementation of visualMode */}
      {/* {mode === QUESTION && <Question/>}
      {mode === SCORE && <ShowScore/>} */}

    </div>
  );
}

export default GameplayView