import PlayerList from './PlayerList'



const playersObj = {
    players: [
    {name: 'player_1', score: 0},
    {name: 'player_2', score: 0},
    {name: 'player_3', score: 0}
  ]
} 

function WaitingRoom() {
 const {players} = playersObj
 return (
  <div>
   <h1>WaitingRoom</h1>  
  <PlayerList players />
  </div>
 )
}


export default WaitingRoom;