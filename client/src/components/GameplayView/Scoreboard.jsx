import ScoreList from "./ScoreList";
import { generateScoreString, orderByScore } from "./scoreHelpers";

import "./ScoreBoard.scss";

const players = [
  { name: "player_1", score: 42, pointsEarned: 3, correctAnswer: true },
  { name: "player_2", score: 65, pointsEarned: -2, correctAnswer: true },
  { name: "player_3", score: 29, pointsEarned: 1, correctAnswer: false },
];

function ScoreBoard({ players }) {
  return (
    <div>
      <h2>Score Board</h2>
      {/* Victory String */}
      {/* Correct Player String */}
      <ScoreList players={players} />
    </div>
  );
}

export default ScoreBoard;
