import { useState, useContext, useEffect } from "react";
// import from "";
import Button from "./Button";
import "./Button.scss";
import "./Home.scss";
import ConnectionContext from "../ConnectionContext";

function Home(props) {
  const [hostName, setHostName] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [gameId, setGameId] = useState(null);
  const [error, setError] = useState(false);
  const { onJoin, onCreate } = props;

  const connection = useContext(ConnectionContext);
  function createGame() {
    if (!hostName) {
      setError(1);
    } else {
      setError(false);
      onCreate(hostName);
    }
  }

  function joinGame() {
    if (!playerName) {
      setError(2);
    } else if (!gameId) {
      setError(3);
    } else {
      connection.current.emit("get_room_info");
    }
  }

  useEffect(() => {
    if (connection.current.id) {
      connection.current.on("room_info", (data) => {

        const openRooms = data.roomInfo.filter(r => !r.started);
        if (openRooms.find(r => r.roomId === gameId)) {
          setError(false);
          onJoin(playerName, gameId);
        } else {
          setError(4);
        }
      });

      const oldConnection = connection.current;

      return () => {
        oldConnection.removeAllListeners("roomIds");
      };
    }
  }, [connection, gameId, playerName, onJoin]);

  return (
    <main>
      <section className="box-home">
        <div className="box-home--content">
          <h1 className="box-home--heading">Let's Get Trivial</h1>
          <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
            <p>Host New Game</p>
            <div className="error-message">
              {error === 1 && <p>Please Enter a Player Name</p>}
            </div>
            <input
              data-testid="host-name-input"
              name="Hostname"
              type="text"
              placeholder="Enter Player Name"
              value={hostName || ""}
              onChange={(event) =>
                setHostName(event.target.value.toUpperCase())
              }
            />
            <Button onClick={() => createGame()} home>
              Create Game
            </Button>
          </form>
          <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
            <p>Join Game </p>
            <div className="error-message">
              {error === 2 && <p>Please Enter a Player Name</p>}
              {error === 3 && <p>Please Enter a Game ID</p>}
              {error === 4 && <p>Invalid Game ID</p>}
            </div>
            <input
              data-testid="player-name-input"
              name="Player Name"
              type="text"
              placeholder="Enter Player Name"
              value={playerName || ""}
              onChange={(event) =>
                setPlayerName(event.target.value.toUpperCase())
              }
            />
            <input
              data-testid="game-id-input"
              name="Hostname"
              type="text"
              placeholder="Enter Game ID"
              value={gameId || ""}
              onChange={(event) => setGameId(event.target.value.toUpperCase())}
            />
            <Button onClick={() => joinGame()} home>
              Join Game
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Home;
