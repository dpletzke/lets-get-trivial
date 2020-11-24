import { useState, useContext } from "react";

import "./index.scss";
import PlayerList from "./PlayerList";
import PlayerListItem from "./PlayerListItem";
import Button from "../Button";
import GameplayView from "../GameplayView";

import ModalComponent from "../Modal";
import { FaCog } from "react-icons/fa";
import { action } from "@storybook/addon-actions";

import ConnectionContext from "../../ConnectionContext";

function WaitingRoom(props) {
  const { players, gameId } = props;

  const [modalIsOpen, setIsOpen] = useState(false);
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
    params: { numQuestions: 5 },
    currentQ: 0,
  };
  const [game, setGame] = useState(initialGame);

  const startGame = () => {
    const { params } = game;

    console.log(`Start ${gameId} request sent to server!`);
    connection.current.emit("start_game", { params });
  };

  connection.current.on("game_started", (data) => {
    const { questions, params } = data;
    
    console.log(`${gameId} started from server!`);
    setGame(prev => ({...prev, questions, started: true, params}));
  });

  connection.current.on('game_ended', data => {

    console.log(`${gameId} ended from server!`);
    setGame(prev => ({...prev, started: false}));
  });

  const controller = (game) => {
    if (!game.started) {
      return (
        <main className="box-waiting">
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
    } else {
      return (
        <>
          <GameplayView {...game} />
        </>
      );
    }
  };

  return controller(game);
}

export default WaitingRoom;
