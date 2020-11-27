import "./ScoreListItem.scss";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import classNames from 'classnames';


function ScoreListItem({ name, score, position, pointsEarned }) {

  const upArrow = classNames("upArrow", {"upArrow--show": (pointsEarned > 0)});
  const downArrow = classNames("downArrow", {"downArrow--show": (pointsEarned < 0)});
  const playerHeading = classNames("player-heading", {"player-heading--firstPlace" : (position===1)})

  return (
    <div className="score-item">
      <div className={playerHeading}>
        <p className="position"> {position} </p>
        <p>
          {/* <FaUser className="player-icon" /> */}
        {name}
        </p>
        <div className="info-group">
          
            <p className="dark">{score}</p>
            <div className="points-group">
            <p className="dark">{pointsEarned}</p>
            <p className={upArrow}><FaArrowUp/></p>
            <p className={downArrow}><FaArrowDown/></p>
            </div>
        </div>
      </div>
    </div>
  );
}

export default ScoreListItem;
