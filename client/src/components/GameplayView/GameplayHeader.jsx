import Timer from "./Timer";
import "./GameplayHeader.scss";
const time = 20;
function GameplayHeader({ questionIndex, view, time }) {
  //isPlaying is a boolean that the clock uses for starting/stopping
  //pass in a prop that tells if it is in question of score mode --> this will conditionally render the text.
  return (
    <div className="header header__gameplay">
      {view === "score" && <p>Next Question In....</p>}
      {view === "question" && <p>Question {questionIndex}</p>}
      <Timer duration={time} isPlaying />
    </div>
  );
}

export default GameplayHeader;
