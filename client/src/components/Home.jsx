import { useState, useContext, useEffect } from "react";
import Button from "./Button";
import ModalComponent from "./Modal";
import Dropdown from "./Dropdown";
import "./Button.scss";
import "./Home.scss";
import ConnectionContext from "../ConnectionContext";
import { FaQuestion } from "react-icons/fa";

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

  const { rulesModalIsOpen, closeModal, openModal } = useModal();

  return (
    <main>
      <section className="box-home">
        <div className="box-home--content">
          <div className="home-header">
            <FaQuestion className="icon" onClick={() => openModal("rules")} />
          </div>
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
      <ModalComponent
        modalIsOpen={rulesModalIsOpen}
        closeModal={() => closeModal("rules")}
      >
        <div className="info-modal">
          <div className="content">
            <p>
              <span className="text-bright">
                <em> Let's Get Trivial</em> brings the fun back to trivia!
              </span>

              <span className="inner-text text-heading">
                <br />
                >> Challenge your friends online
                <br />
                >> Play opponents from around the globe in a public room
                <br />
                >> Fully customizable categories and game settings
                <br />
              </span>
            </p>
          </div>
          <div className="rules-heading">
            <h3>How To Play</h3>
          </div>
          <div className="content content--rules">
            <p>
              <span className="text-bright">Game Types</span>
              <span className="inner-text text-heading">
                <br />
                <span className="category-text">Private</span>
                <br />
                1. Create a private game room
                <br />
                2. Send your friends the generated game ID
                <br />
                3. Select desired game category and settings
                <br />
                4. Wait for your friends to join
                <br />
                <span className="category-text">Public</span>
                <br />
                1. Create a public game room and wait for players to join
                <br />
                OR
                <br />
                2. Join a pre-existing public game from the home-page
                <br />
                <br />
                <span className="text-bright">Scoring</span>
                <br />
                <span className="category-text"></span>
                1. Points are earned for correct answers and removed for
                incorrect answers.
                <br />
                2. The number of points for each question is based on the
                difficulty of the question.
                <br />
                3. Your updated score and points earned for will be shown at the
                end of each question.
                <br />
                <br />
                <span className="text-bright">Customizable Game Settings</span>
                <br />
                <span className="category-text"></span>
                Access game settings upon creating or joing a game
                <br />
                <span className="category-text">Category</span>
                <br />
                <span className="category-text"></span>
                Select from over 20 categories or leave the category unselected
                to generate random categories for each question
                <br />
                <span className="category-text">Number of Questions</span>
                <br />
                <span className="category-text"></span>
                Decide how many questions you want for each round
                <br />
                <span className="category-text">Difficulty</span>
                <br />
                <span className="category-text"></span>
                Choose between <em>easy</em>, <em>medium</em>, <em>hard</em> or
                <em>mixed</em>
                <br />
                <span className="category-text">Time Limit</span>
                <br />
                <span className="category-text"></span>
                Set the time allowed to answer each question.
                <br />
                <span className="category-text">
                  Correct Answers Per Question
                </span>
                <br />
                <span className="category-text"></span>
                Decide how many players need to answer a question correctly
                before the question moves on, leaving the others in the dust.
                <br />
              </span>
            </p>
          </div>
        </div>
      </ModalComponent>
    </main>
  );
}

export default Home;
