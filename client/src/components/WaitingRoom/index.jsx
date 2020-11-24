import { useState, useContext, useEffect } from "react";

import "./index.scss";
import PlayerList from "./PlayerList";
import PlayerListItem from "./PlayerListItem";
import Button from "../Button";
import GameplayView from "../GameplayView";
import OptionsForm from "../WaitingRoom/OptionsForm/index";

import ModalComponent from "../Modal";
import { FaCog } from "react-icons/fa";
import { action } from "@storybook/addon-actions";

import ConnectionContext from "../../ConnectionContext";
import useGameData from '../../hooks/useGameData'

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

  const {
   game,
    setOptions,
    startGame,
  } = useGameData(gameId, connection)


  const controller = (game) => {

    if (!game.started) {
      return (
        <main className="box-waiting">
          <div className="box-waiting--content">
            <div className="waiting-header">
              <FaCog className="icon" onClick={openModal} />
            </div>
            <h1 class="box-waiting--header">Let's Get Trivial</h1>
            <PlayerListItem className="alt-text" name={gameId} gameIdItem />
            <PlayerList players={players} />
            <Button onClick={startGame} gameRoom>
              Start Game >>
            </Button>
            <ModalComponent modalIsOpen={modalIsOpen} closeModal={closeModal}>
              <OptionsForm options={game.params} setOptions={setOptions}/>
            </ModalComponent>
          </div>
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
