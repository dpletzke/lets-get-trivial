function VictoryString({winners, highScore}) {
  const digestWinners = (winners) => {
    if (winners.length === 2) {
      return winners.join(' and ')
    } else {
      const lastWinner = winners[winners.length -1]
      winners.pop();
      return `${winners.join(', ')}, and ${lastWinner}`
    }
  }

  const winnersString = digestWinners(winners);


  return (
    <>
      {winners.length === 1 && <h1>{winners[0]} wins!!</h1>}
    {winners.length > 1 && <h1>{winnersString} win!!</h1>}
    </>
  );
}

export default VictoryString