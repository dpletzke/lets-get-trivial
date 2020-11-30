import { useContext, useState } from "react";

import "./index.scss";
import PlayerList from "./PlayerList";
import PlayerListItem from "./PlayerListItem";
import Button from "../Button";
import GameplayView from "../GameplayView";
import OptionsForm from "../WaitingRoom/OptionsForm/index";
import GameRules from "../GameRules";

import ModalComponent from "../Modal";
import { FaCog, FaQuestion } from "react-icons/fa";
import { ImExit } from "react-icons/im";

import ConnectionContext from "../../ConnectionContext";

import useGameData from "../../hooks/useGameData";
import useModal from "../../hooks/useModal";

const { settings, defaults } = require("../../config/settings");

function WaitingRoom(props) {
  const { players, gameId, onLeave } = props;
  const [audioOn, setAudioOn] = useState(false);
  const connection = useContext(ConnectionContext);

  const {
    configModalIsOpen,
    rulesModalIsOpen,
    closeModal,
    openModal,
  } = useModal();

  const { game, startGame, setters, view, setView } = useGameData(
    gameId,
    connection,
    defaults
  );

  const toggleAudio = () => {
    audioOn ? setAudioOn(false) : setAudioOn(true);
  };

  const controller = (game) => {
    if (!game.started) {
      return (
        <main className="box-waiting">
          <div className="box-waiting--content">
            <header className="waiting-header">
              <ImExit className="icon" onClick={() => onLeave()} />
              <div>
                <FaQuestion className="icon" onClick={() => openModal("rules")} />
                <FaCog className="icon" onClick={() => openModal("config")} />
              </div>
            </header>
            <h1 className="box-waiting--header">Waiting for Players...</h1>
            <PlayerListItem className="alt-text" name={gameId} gameIdItem />
            <Button className="pulse" onClick={startGame} gameRoom>
              Start Game >>
            </Button>
            <PlayerList players={players} />

            <ModalComponent
              modalIsOpen={configModalIsOpen}
              closeModal={() => closeModal("config")}
            >
              <OptionsForm
                setVolume={() => toggleAudio()}
                setters={setters}
                params={game.params}
                settings={settings}
                audioOn={audioOn}
              />
            </ModalComponent>
            <ModalComponent
              modalIsOpen={rulesModalIsOpen}
              closeModal={() => closeModal("rules")}
            >
              <GameRules />
            </ModalComponent>
          </div>
        </main>
      );
    } else {
      return (
        <>
          <GameplayView
            {...game}
            view={view}
            setView={setView}
            audioOn={audioOn}
          />
        </>
      );
    }
  };

  return controller(game);
}

export default WaitingRoom;
