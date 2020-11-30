import ScoreList from "./ScoreList";
import { useEffect } from "react";
import GameplayHeader from "./GameplayHeader";
import Loading from "../Loading";
import VictoryString from "./VictoryString";
import {
  generateScoreString,
  findPlacements,
  orderByScore,
} from "./scoreHelpers";
import classNames from "classnames";
import "./ScoreBoard.scss";

function ScoreBoard({ players, time, view, audioOn }) {
  const orderedArray = orderByScore(players);
  const scoresArray = findPlacements(players);
  const scoreString = generateScoreString(players);

  const highScore = scoresArray[0];

  const winnersArray = orderedArray
    .filter((playerObj) => playerObj.score === highScore)
    .map((playerObj) => playerObj.name);

  //not yet implemented below line (sound for losing game)
  // let loserSong = new Audio("/sounds/loseGame.mp3");
  let winnerSong = new Audio("/sounds/winGame.mp3");
  winnerSong.volume = 0.12;
  let scoreSong = new Audio("/sounds/level-up.mp3");
  scoreSong.volume = 0.7;

  const gameplayClass = classNames("gamePlay", {
    "gamePlay--visible": view === "SCORE",
  });

  const victorySong = () => {
    winnerSong.play().catch((err) => console.log(err));
  };

  const scoreAlert = () => {
    scoreSong.play().catch((err) => console.log(err));
  };

  useEffect(() => {
    if (audioOn && view === "FINISHED") {
      victorySong();
    } else if (audioOn) {
      scoreAlert();
    }
  }, []);

  console.log("View: ", view);

  const victoryClass = classNames("victory", {
    "victory--visible": view === "FINISHED",
  });

  return (
    <div className="page-container">
      <div className="box-scoreboard">
        <div className={gameplayClass}>
          <div className="scoreboard-header">
            <GameplayHeader time={time} view="score" />
          </div>
          <h2>Scores</h2>

          <p>{scoreString}</p>
        </div>
        <div className="end-loading">{view === "FINISHED" && <Loading />}</div>

        <div className={victoryClass}>
          <VictoryString winners={winnersArray} highScore={highScore} />
        </div>
        <ScoreList
          orderedArray={orderedArray}
          scoresArray={scoresArray}
          view={view}
        />
      </div>
    </div>
  );
}

export default ScoreBoard;
