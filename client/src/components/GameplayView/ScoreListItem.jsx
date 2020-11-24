import "./ScoreListItem.scss";
import { FaUser } from "react-icons/fa";

function ScoreListItem({ name, score, position, pointsEarned }) {
  return (
    <div className="player-heading">
      <h3>
        <FaUser className="player-icon" />
        Player 1
      </h3>
      <div className="info-group">
        <span>
          Position:
          <div className="dark">1st</div>
        </span>
        <span>
          Score:
          <div className="dark">70</div>
        </span>
        <span>
          Points Earned:
          <div className="dark">2</div>
        </span>
      </div>
    </div>
  );
}

export default ScoreListItem;
