import { useState, useContext } from "react";
// import from "";
import Button from "./Button";
import "./Button.scss";
import "./Home.scss";
import ConnectionContext from '../ConnectionContext'

function Home(props) {
  //host name , guest name, gameRoomId
  const [hostName, setHostName] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [gameId, setGameId] = useState(null);
  const [error, setError] = useState(false)
  //To Do - Add new passed down functions as props in order to handle the 2 form submits
  const { onJoin, onCreate } = props;

  const connection = useContext(ConnectionContext);
  const connectionId = connection.id;

  // let hostNameError = false;
  // let playerNameError = false;

  function joinGame() {
    console.log('clicked')
    if(!playerName){
      console.log('clicked in conditional')
     
      setError(2)
    } else {
      setError(false)
      
      onJoin(playerName, gameId)
    }
  }

  function createGame() {
    if(!hostName){
      setError(1)
     
    } else {
     setError(false)
      onCreate(hostName)
    }
  }

  return (
    
    <main>
      <section className="box-home">
        <h1>Let's Get Trivial</h1>
        
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <p>Host New Game</p>
          {error === 1 && <p>Please Enter a Player Name</p>}
          {error && console.log("host name error")}
          <input
            data-testid="host-name-input"
            name="Hostname"
            type="text"
            placeholder="Enter Player Name"
            value={hostName || ''}
            onChange={(event) => setHostName(event.target.value)}
          />
          <Button onClick={() => createGame()} home>
            Create Game
          </Button>
        </form>
        
          <p>{connectionId}</p>
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <p>Join Game </p>
          {error === 2 && <p>Please Enter a Player Name</p>}
          <input
            data-testid="player-name-input"
            name="Player Name"
            type="text"
            placeholder="Enter Player Name"
            value={playerName || ''}
            onChange={(event) => setPlayerName(event.target.value)}
          />
          <input
            data-testid="game-id-input"
            name="Hostname"
            type="text"
            placeholder="Enter Game ID"
            value={gameId || ''}
            onChange={(event) => setGameId(event.target.value)}
          />
          <Button onClick={() => joinGame()} home>
            Join Game
          </Button>
        </form>
      </section>
    </main>
  );
}

export default Home;
