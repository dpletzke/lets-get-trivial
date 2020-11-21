import { useState } from "react";
import Button from "./Button";
// import logo from '../images/logo.jpg'

import "./Button.scss";
import "./Home.scss";

function Home(props) {
  //host name , guest name, gameRoomId
  const [hostName, setHostName] = useState(props.hostName || "");
  const [playerName, setPlayerName] = useState(props.playerName || "");
  const [gameId, setGameId] = useState(props.gameId || "");
  //To Do - Add new passed down functions as props in order to handle the 2 form submits
  const { onSave } = props;

  return (
    <main>
      <section className="box-home">
        <h1>Let's Get Trivial</h1>
        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <p>Host New Game</p>
          <input
            data-testid="player-name-input"
            name="Hostname"
            type="text"
            placeholder="Enter Player Name"
            value={hostName}
            onChange={(event) => setHostName(event.target.value)}
          />
          <Button onClick={() => onSave(hostName)} home>
            Create Game
          </Button>
        </form>

        <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
          <p>Join Game </p>
          <input
            data-testid="player-name-input"
            name="Hostname"
            type="text"
            placeholder="Enter Player Name"
            value={playerName}
            onChange={(event) => setPlayerName(event.target.value)}
          />
          <input
            data-testid="player-name-input"
            name="Hostname"
            type="text"
            placeholder="Enter Game ID"
            value={gameId}
            onChange={(event) => setGameId(event.target.value)}
          />
          <Button onClick={() => onSave(playerName, gameId)} home>
            Join Game
          </Button>
        </form>
      </section>
    </main>
  );
}

export default Home;
