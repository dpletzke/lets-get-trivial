import { useContext } from "react";

import "./index.scss";
import PlayerList from "./PlayerList";
import PlayerListItem from "./PlayerListItem";
import Button from "../Button";
import GameplayView from "../GameplayView";
import OptionsForm from "../WaitingRoom/OptionsForm/index";

import ModalComponent from "../Modal";
import { FaCog, FaQuestion } from "react-icons/fa";

import ConnectionContext from "../../ConnectionContext";

import useGameData from "../../hooks/useGameData";
import useModal from "../../hooks/useModal";

function WaitingRoom(props) {
  const { players, gameId } = props;

  const connection = useContext(ConnectionContext);

  const { configModalIsOpen, rulesModalIsOpen, closeModal, openModal } = useModal();

  const { game, startGame, setters, view, setView } = useGameData(
    gameId,
    connection
  );

  const controller = (game) => {
    if (!game.started) {
      return (
        <main className="box-waiting">
          <div className="box-waiting--content">
            <div className="waiting-header">
              <FaCog className="icon" onClick={()=> openModal('config')} />
              <FaQuestion className="icon" onClick={()=> openModal('rules')} />
            </div>
            <h1 className="box-waiting--header">Let's Get Trivial</h1>
            <PlayerListItem className="alt-text" name={gameId} gameIdItem />
            <PlayerList players={players} />
            <Button onClick={startGame} gameRoom>
              Start Game >>
            </Button>
            <ModalComponent modalIsOpen={configModalIsOpen} closeModal={()=> closeModal("config")}>
              <OptionsForm setters={setters} params={game.params} />
            </ModalComponent>
            <ModalComponent modalIsOpen={rulesModalIsOpen} closeModal={()=> closeModal("rules")}>
              <p>Here are the rules!</p>
              </ModalComponent>
          </div>
        </main>
      );
    } else {
      return (
        <>
          <GameplayView {...game} view={view} setView={setView} />
        </>
      );
    }
  };

  return controller(game);
}

export default WaitingRoom;
