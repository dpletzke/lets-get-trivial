import "./ScoreListItem.scss";
import { FaUser } from "react-icons/fa";

function ScoreListItem({ name, score, position, pointsEarned }) {
  return (
    <div className="score-item">
      <div className="player-heading">
        <h3>
          <FaUser className="player-icon" />
          {name}
        </h3>
        <div className="info-group">
          <span>
            Position:
            <div className="dark">{position}</div>
          </span>
          <span>
            Score:
            <div className="dark">{score}</div>
          </span>
          <span>
            Points Earned:
            <div className="dark">{pointsEarned}</div>
          </span>
        </div>
      </div>
    </div>
  );
}

export default ScoreListItem;
