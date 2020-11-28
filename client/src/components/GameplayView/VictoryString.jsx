function VictoryString({scoresArray, orderedPlayersArray}) {
  const highScore = scoresArray[0];

  const winnersArray = orderedPlayersArray.filter((playerObj) => 
    playerObj.score === highScore
  )
  .map((playerObj) => playerObj.name);


  return (
  <h1>{winnersArray}</h1>
  );
}

export default VictoryString