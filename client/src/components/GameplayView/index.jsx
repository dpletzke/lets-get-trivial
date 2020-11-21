import GameplayHeader from './GameplayHeader'
import Question from './Question'
import ShowScore from './ShowScore'

const QUESTION = 'QUESTION';
const SCORE = 'SCORE';

// uncomment below after implementation of custom hook
// import useVisualMode from...
// const { mode } = useVisualMode(QUESTION)

function GameplayView() {
  return (
  <div>
    <h1>GameplayView Component</h1>
    <GameplayHeader/>
    {/* uncomment below on implemenation of visualMode */}
    {/* {mode === QUESTION && <Question/>}
    {mode === SCORE && <ShowScore/>} */}

  </div>
  );
}

export default GameplayView