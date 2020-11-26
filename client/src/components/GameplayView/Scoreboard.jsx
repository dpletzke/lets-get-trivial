import ScoreList from "./ScoreList";
import GameplayHeader from "./GameplayHeader";
import { generateScoreString } from "./scoreHelpers";

import "./ScoreBoard.scss";

//needs to take props players and time (for timer), view (score/question),  optional isPlaying boolean which turns timer on or off
function ScoreBoard({ players, time, view }) {
  const scoreString = generateScoreString(players);
  return (
    <div className="page-container">
      <br />
      <GameplayHeader time={5} view="score" />
      <h2>Scores</h2>

      <p>{scoreString}</p>

      <ScoreList players={players} />
    </div>
  );
}

export default ScoreBoard;
