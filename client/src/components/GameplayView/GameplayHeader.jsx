import { useEffect } from "react";
import Timer from "./Timer";
import "./GameplayHeader.scss";
function GameplayHeader({ questionIndex, view, time }) {
  //isPlaying is a boolean that the clock uses for starting/stopping
  //time is currently hard coded in question and scoreboard jsx. replace this with prop from backend.

  useEffect(() => {
    if (view === "score") {
      setTimeout(() => {
        console.log(time);
        console.log("IT HIT 0 NOW");
      }, time - 2);
    }
  }, []);

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
