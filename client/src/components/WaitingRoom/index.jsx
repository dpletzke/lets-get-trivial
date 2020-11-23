import { useState, useContext } from "react";

import "./index.scss";
import PlayerList from "./PlayerList";
import PlayerListItem from "./PlayerListItem";
import Button from "../Button";
import { FaCog } from "react-icons/fa";

import ConnectionContext from "../../ConnectionContext";

function WaitingRoom(props) {
  const { players, gameId } = props;

  const initialGame = { started: false, questions: []};
  const [game, setGame] = useState(initialGame);
  
  const connection = useContext(ConnectionContext);

  const startGame = () => {
    console.log(`Start ${gameId} request sent to server!`);
    connection.current.emit('start_game');
  }

  connection.current.on('game_started', data => {
    const { questions } = data;

    console.log(`${gameId} started from server!`);
    setGame(prev => ({...prev, questions, started: true}));
  })

  const controller = (gameStarted) => {
    if (!gameStarted) {
      return (
        <main className="box-waiting">
        <div className="waiting-header">
          <FaCog className="icon" />
        </div>
        <h2>Let's Get Trivial</h2>
        <PlayerListItem className="alt-text" name={gameId} gameIdItem />
        <PlayerList players={players} />
        <Button onClick={startGame} gameRoom>Start Game >></Button>
      </main>
      )
    } else {
      return (
        <>
          <p>Your game started!</p>
          <p>{connection.current.id}</p>
          <p>{JSON.stringify(game.questions)}</p>
        </>
      );
    }
  }

  return (
    controller(game.started)
  );
}

export default WaitingRoom;
