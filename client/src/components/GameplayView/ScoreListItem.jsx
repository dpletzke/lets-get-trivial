import "./ScoreListItem.scss";
import { FaUser } from "react-icons/fa";

function ScoreListItem({ name, score, position, pointsEarned }) {
  return (
    <div className="score-item">
      <div className="player-heading">
        <p>
          {/* <FaUser className="player-icon" /> */}
         {position} {name}
        </p>
        <div className="info-group">
          <p>
            Score:
          </p>
            <p className="dark">{score}</p>
            <p className="dark">{pointsEarned}</p>
       
        </div>
      </div>
    </div>
  );
}

export default ScoreListItem;
