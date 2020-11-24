import { useState, useContext } from "react";

import "./index.scss";
import PlayerList from "./PlayerList";
import PlayerListItem from "./PlayerListItem";
import Button from "../Button";

import ModalComponent from "../Modal";
// =======
// import GameplayView from "../GameplayView";


// import ModalComponent from '../Modal'
// >>>>>>> master
import { FaCog } from "react-icons/fa";
import { action } from "@storybook/addon-actions";

import ConnectionContext from "../../ConnectionContext";

function WaitingRoom(props) {

  const [modalIsOpen, setIsOpen] = useState(false);
// =======
//   const { players, gameId } = props;

//   const [modalIsOpen,setIsOpen] = useState(false);

  function openModal() {
    console.log("openModal");
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const connection = useContext(ConnectionContext);

  const initialGame = {
    started: false,
    questions: [],
<<<<<<< HEAD
    params: { numQuestions: 2 },
=======
    params: {numQuestions: 5},
    currentQ: 0
>>>>>>> master
  };
  const [game, setGame] = useState(initialGame);

  const startGame = () => {
    const { params } = game;

    console.log(`Start ${gameId} request sent to server!`);
<<<<<<< HEAD
    connection.current.emit("start_game", { params: game.params });
  };

  connection.current.on("game_started", (data) => {
    const { questions } = data;

    console.log(`${gameId} started from server!`);
    setGame((prev) => ({ ...prev, questions, started: true }));
  });
=======
    connection.current.emit('start_game', { params });
  }

  connection.current.on('game_started', data => {
    const { questions, params } = data;
    console.log(`${gameId} started from server!`);
    setGame(prev => ({...prev, questions, started: true, params}));
  })
>>>>>>> master

  const controller = (game) => {
    if (!game.started) {
      return (
        <main className="box-waiting">
<<<<<<< HEAD
          <div className="waiting-header">
            <FaCog className="icon" onClick={openModal} />
          </div>
          <h2>Let's Get Trivial</h2>
          <PlayerListItem className="alt-text" name={gameId} gameIdItem />
          <PlayerList players={players} />
          <Button onClick={startGame} gameRoom>
            Start Game >>
          </Button>
          <ModalComponent modalIsOpen={modalIsOpen} closeModal={closeModal}>
            Form component goes here
          </ModalComponent>
        </main>
      );
=======
        <div className="waiting-header">
          <FaCog className="icon" onClick={openModal}/>
        </div>
        <h2>Let's Get Trivial</h2>
        <PlayerListItem className="alt-text" name={gameId} gameIdItem />
        <PlayerList players={players} />
        <Button onClick={startGame} gameRoom>Start Game >></Button>
        <ModalComponent modalIsOpen={modalIsOpen} closeModal={closeModal}>
           Form component goes here
        </ModalComponent>
      </main>
      )
>>>>>>> master
    } else {

      return (
        <>
          <GameplayView {...game}/>
        </>
      );
    }
<<<<<<< HEAD
  };

  return controller(game);
=======
  }

  return (
    controller(game)
  );
>>>>>>> master
}

export default WaitingRoom;
