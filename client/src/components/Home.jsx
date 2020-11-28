import { useState, useContext, useEffect } from "react";
import Button from "./Button";
import ModalComponent from "./Modal";
import GameRules from "./GameRules";
import Dropdown from "./Dropdown";
import PublicGames from "./PublicGames";
import "./Button.scss";
import "./Home.scss";
import ConnectionContext from "../ConnectionContext";
import { FaQuestion } from "react-icons/fa";
import { MdPublic } from "react-icons/md";

import useHomeData from "../hooks/useHomeData";
import useModal from "../hooks/useModal";

function Home(props) {
  const { onJoin, onCreate } = props;
  const connection = useContext(ConnectionContext);

  const {
    hostName,
    setHostName,
    playerName,
    setPlayerName,
    gameId,
    setGameId,
    error,
    createGame,
    joinGame,
  } = useHomeData(connection, onJoin, onCreate);

  const { rulesModalIsOpen, publicModalIsOpen, closeModal, openModal } = useModal();

  return (
    <main>
      <section className="box-home">
        <div className="box-home--content">
          <div className="home-header">
            <FaQuestion className="icon" onClick={() => openModal("rules")} />
          </div>
          <h1 className="box-home--heading">Let's Get Trivial</h1>
          <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
            <p>Create New Game</p>
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
            <Button onClick={() => createGame(false)} home>
              Private
            </Button>
            <Button onClick={() => createGame(true)} home>
              Public
            </Button>
          </form>
          <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>
            <div className="icon__box">
            <MdPublic className="icon icon__public" onClick={() => openModal("public")}/>
            </div>
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
      <ModalComponent
        modalIsOpen={rulesModalIsOpen}
        closeModal={() => closeModal("rules")}
      >
        <GameRules />
      </ModalComponent>
      <ModalComponent modalIsOpen={publicModalIsOpen} closeModal={()=> closeModal('public')} >
        <PublicGames />
      </ ModalComponent>
    </main>
  );
}

export default Home;
