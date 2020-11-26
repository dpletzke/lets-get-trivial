import Timer from "./Timer";
import "./GameplayHeader.scss";
const time = 20;
function GameplayHeader({ questionIndex, view, time }) {
  //isPlaying is a boolean that the clock uses for starting/stopping
  //time is currently hard coded in question and scoreboard jsx. replace this with prop from backend.

  return (
    <div className="header header__gameplay">
      {view === "score" && <p className="small-text">Next Question In...</p>}
      {view === "question" && <p>Question {questionIndex}</p>}
      <Timer duration={time} isPlaying />
    </div>
  );
}

export default GameplayHeader;
