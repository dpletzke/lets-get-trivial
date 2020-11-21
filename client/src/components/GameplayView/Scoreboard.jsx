import Player from './Player'

const players = [
  {name: 'player_1', score: 42},
  {name: 'player_2', score: 65},
  {name: 'player_3', score: 29}
]

function ScoreBoard(props) {
  // {players} = props

  return (
    <div>
      <h1>ScoreBoard Component</h1>
      {players && players.map((player) => <Player name={player.name} score={player.score} />)}
    </div>
  );
}

export default ScoreBoard;