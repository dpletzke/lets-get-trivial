import PlayerListItem from './PlayerListItem'

const playersObj = {
    players: [
    {name: 'player_1', score: 0},
    {name: 'player_2', score: 0},
    {name: 'player_3', score: 0}
  ]
} 

function PlayerList() {

  const {players} = playersObj
  const list = players.map((player) => <PlayerListItem name = {player.name} />)
  return (
    <div>
    <h1>PlayerList</h1>  
    <div>{list}</div>
    </div>
    ) 
}

export default PlayerList;