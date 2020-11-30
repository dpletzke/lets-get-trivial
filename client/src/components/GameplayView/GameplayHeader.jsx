import { useEffect } from "react";
import Timer from "./Timer";
import "./GameplayHeader.scss";
function GameplayHeader({ questionIndex, view, time }) {
  console.log({ questionIndex });
  return (
    <div className="header header__gameplay">
      {view === "score" && <p>Next Question In...</p>}
      {view === "question" && <p>Question {questionIndex}</p>}
      <Timer duration={time} isPlaying />
    </div>
  );
}

export default GameplayHeader;
