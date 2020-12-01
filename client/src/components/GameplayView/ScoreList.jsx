import ScoreListItem from "./ScoreListItem";
import "./ScoreListItem.scss";

function ScoreList({ orderedArray, scoresArray }) {
  

  return (
    <div>
      {orderedArray &&
        orderedArray.slice(0,5).map((player, index) => (
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
