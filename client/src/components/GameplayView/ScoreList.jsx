import ScoreListItem from "./ScoreListItem";
import { findPlacements, orderByScore } from "./scoreHelpers";
import "./ScoreListItem.scss";

//players obj
// const players = [
//   { name: "player_1", score: 42, pointsEarned: 3, correctAnswer: true },
//   { name: "player_6", score: 42, pointsEarned: 3, correctAnswer: false },
//   { name: "player_2", score: 65, pointsEarned: -2, correctAnswer: true },
//   { name: "player_3", score: 29, pointsEarned: 1, correctAnswer: false },
//   { name: "player_4", score: 29, pointsEarned: 1, correctAnswer: false },
//   { name: "player_5", score: 29, pointsEarned: 1, correctAnswer: true },
// ];

// Render a list of Players in numerical order. --> show score and game placement
// helper function to calc num of players and show placement -- aka if players are tied don't increase number.
function ScoreList({ players }) {
  const orderedArray = orderByScore(players);
  const scoresArray = findPlacements(players);

  return (
    <div>
      {orderedArray &&
        orderedArray.map((player, index) => (
          <ScoreListItem
            key={index}
            name={player.name}
            score={player.score}
            pointsEarned={player.pointsEarned}
            position={scoresArray.findIndex((s) => s === player.score) + 1}
          />
        ))}
    </div>
  );
}

export default ScoreList;
