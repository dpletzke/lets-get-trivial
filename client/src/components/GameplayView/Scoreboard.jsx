import ScoreList from "./ScoreList";
import { generateScoreString } from "./scoreHelpers";

import "./ScoreBoard.scss";

const players = [
  { name: "player_1", score: 42, pointsEarned: 3, correctAnswer: true },
  { name: "player_6", score: 42, pointsEarned: 3, correctAnswer: false },
  { name: "player_2", score: 65, pointsEarned: -2, correctAnswer: true },
  { name: "player_3", score: 29, pointsEarned: 1, correctAnswer: false },
  { name: "player_4", score: 29, pointsEarned: 1, correctAnswer: false },
  { name: "player_5", score: 29, pointsEarned: 1, correctAnswer: true },
];

function ScoreBoard() {
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
