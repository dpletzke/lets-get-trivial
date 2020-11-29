import {useEffect} from 'react';

import ScoreListItem from "./ScoreListItem";
import { findPlacements, orderByScore } from "./scoreHelpers";
import "./ScoreListItem.scss";

//players obj


// Render a list of Players in numerical order. --> show score and game placement
// helper function to calc num of players and show placement -- aka if players are tied don't increase number.
function ScoreList({ orderedArray, scoresArray }) {

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
