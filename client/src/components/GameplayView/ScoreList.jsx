import ScoreListItem from "./ScoreListItem";
import { generateScoreString, orderByScore } from "./scoreHelpers";
import "./ScoreListItem.scss";

//players obj

// Render a list of Players in numerical order. --> show score and game placement
// helper function to calc num of players and show placement -- aka if players are tied don't increase number.
function ScoreList({ players }) {
  //takes in a player object.

  return (
    <div>
      <p>Player_1 and Player_2 answered correctly.</p>
      {players &&
        players.map((player) => (
          <ScoreListItem name={player.name} score={player.score} />
        ))}
    </div>
  );
}

export default ScoreList;
