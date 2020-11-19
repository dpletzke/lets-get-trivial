import GameplayHeader from './GameplayHeader'
import Question from './Question'
import ShowScore from './ShowScore'

function GameplayView() {
  return (
  <div>
    <h1>GameplayView Component</h1>
    <GameplayHeader/>
    {mode === QUESTION && <Question/>}
    {mode === SCORE && <ShowScore/>}
  </div>
  );
}

export default GameplayView