import ScoreList from "./ScoreList";
import { useState, useEffect } from "react";
import GameplayHeader from "./GameplayHeader";
import VictoryString from "./VictoryString";
import { generateScoreString } from "./scoreHelpers";
import classNames from "classnames";

import "./ScoreBoard.scss";
import { MdPublic } from "react-icons/md";

//needs to take props players and time (for timer), view (score/question),  optional isPlaying boolean which turns timer on or off
function ScoreBoard({ players, time, view, audioOn }) {
  const [orderedPlayersArray, setPlayersArray] = useState([]);
  const [scoresArray, setScoresArray] = useState([]);

  let gameThemeSong = new Audio("/sounds/scoreSong.mp3");
  gameThemeSong.volume = 0.08;

  const themeSong = () => {
    gameThemeSong.play({ volume: 0.2 });
  };

  useEffect(() => {
    if (audioOn) {
      themeSong();
    }
  }, []);

  console.log("View: ", view);
  console.log("Time", time);
  const gameplayClass = classNames("gamePlay", {
    "gamePlay--visible": view === "SCORE",
  });

  const victoryClass = classNames("victory", {
    "victory--visible": view === "FINISHED",
  });

  const scoreString = generateScoreString(players);
  return (
    <div className="page-container">
      <div className="box-scoreboard">
        <div className={gameplayClass}>
          <GameplayHeader time={time} view="score" />
          <h2>Scores</h2>

          <p>{scoreString}</p>
        </div>

        <div className={victoryClass}>
          <VictoryString
            scoresArray={scoresArray}
            orderedPlayersArray={orderedPlayersArray}
          />
        </div>
        <ScoreList
          setPlayersArray={setPlayersArray}
          setScoresArray={setScoresArray}
          players={players}
        />
      </div>
    </div>
  );
}

export default ScoreBoard;
