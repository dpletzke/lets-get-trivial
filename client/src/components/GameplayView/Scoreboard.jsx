import ScoreList from "./ScoreList";
import {useState} from 'react';
import GameplayHeader from "./GameplayHeader";
import VictoryString from './VictoryString';
import { generateScoreString, findPlacements, orderByScore } from "./scoreHelpers";
import classNames from 'classnames';

import "./ScoreBoard.scss";
import { MdPublic } from "react-icons/md";

//needs to take props players and time (for timer), view (score/question),  optional isPlaying boolean which turns timer on or off
function ScoreBoard({ players, time, view}) {
  const orderedArray = orderByScore(players);
  const scoresArray = findPlacements(players);

  const highScore = scoresArray[0];

  const winnersArray = orderedArray.filter((playerObj) => 
    playerObj.score === highScore
  )
  .map((playerObj) => playerObj.name);


  const gameplayClass = classNames('gamePlay', {'gamePlay--visible': view === 'SCORE'})

  const victoryClass = classNames('victory', {'victory--visible' : view === 'FINISHED'})

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
  <VictoryString  />
</div>
      <ScoreList orderedArray={orderedArray} scoresArray={scoresArray} view={view} />
      </div>
    </div>
  );
}

export default ScoreBoard;
