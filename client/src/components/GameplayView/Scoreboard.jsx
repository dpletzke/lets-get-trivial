import ScoreList from "./ScoreList";
import { useState, useEffect } from "react";
import GameplayHeader from "./GameplayHeader";
import VictoryString from "./VictoryString";
import {
  generateScoreString,
  findPlacements,
  orderByScore,
} from "./scoreHelpers";
import classNames from "classnames";
import "./ScoreBoard.scss";
// import { MdPublic } from "react-icons/md";

//needs to take props players and time (for timer), view (score/question),  optional isPlaying boolean which turns timer on or off
function ScoreBoard({ players, time, view, audioOn }) {
  const orderedArray = orderByScore(players);
  console.log(orderedArray);
  const scoresArray = findPlacements(players);
  console.log(scoresArray);
  const scoreString = generateScoreString(players);

  const highScore = scoresArray[0];

  const winnersArray = orderedArray
    .filter((playerObj) => playerObj.score === highScore)
    .map((playerObj) => playerObj.name);

  console.log(winnersArray);

  let scoreSong = new Audio("/sounds/level-up.mp3");
  scoreSong.volume = 0.6;

  const gameplayClass = classNames("gamePlay", {
    "gamePlay--visible": view === "SCORE",
  });

  const themeSong = () => {
    scoreSong.play();
  };

  useEffect(() => {
    if (audioOn) {
      themeSong();
    }
  }, []);

  console.log("View: ", view);
  console.log("Time", time);

  const victoryClass = classNames("victory", {
    "victory--visible": view === "FINISHED",
  });

  return (
    <div className="page-container">
      <div className="box-scoreboard">
        <div className={gameplayClass}>
          <GameplayHeader time={time} view="score" />
          <h2>Scores</h2>

          <p>{scoreString}</p>
        </div>

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
