import "./VictoryString.scss";

function VictoryString({ winners }) {
  
  const digestWinners = (winners) => {
    if (winners.length === 2) {
      return winners.join(" and ");
    } else if (winners.length > 2) {
      const lastWinner = winners[winners.length - 1];
      const otherWinners = winners.slice(0, winners.length - 1);
      return `${otherWinners.join(", ")}, and ${lastWinner}`;
    }
  };

  const winnersString = digestWinners(winners);

  return (
    <>
      {winners.length === 1 && <h1 className="large">{winners[0]} wins!!</h1>}
      {winners.length === 2 && (
        <h1 className="medium">{winnersString} win!!</h1>
      )}
      {winners.length > 2 && <h1 className="small">{winnersString} win!!</h1>}
    </>
  );
}

export default VictoryString;
