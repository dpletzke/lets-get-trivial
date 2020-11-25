import ScoreList from "./ScoreList";
import { generateScoreString } from "./scoreHelpers";

import "./ScoreBoard.scss";

function ScoreBoard({ players }) {
  const scoreString = generateScoreString(players);
  return (
    <div>
      <h2>Score Board</h2>

      <p>{scoreString}</p>
      <ScoreList players={players} />
    </div>
  );
}

export default ScoreBoard;
