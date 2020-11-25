import ScoreList from "./ScoreList";
import GameplayHeader from "./GameplayHeader";
import { generateScoreString } from "./scoreHelpers";

import "./ScoreBoard.scss";

function ScoreBoard({ players }) {
  const scoreString = generateScoreString(players);
  return (
    <div>
      <GameplayHeader time={5} view="score" />
      <h2>Score Board</h2>

      <p>{scoreString}</p>
      <ScoreList players={players} />
    </div>
  );
}

export default ScoreBoard;
