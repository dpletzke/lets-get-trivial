import { useContext } from "react";

import "./index.scss";
import PlayerList from "./PlayerList";
import PlayerListItem from "./PlayerListItem";
import Button from "../Button";
import GameplayView from "../GameplayView";
import OptionsForm from "../WaitingRoom/OptionsForm/index";

import ModalComponent from "../Modal";
import { FaCog } from "react-icons/fa";

import ConnectionContext from "../../ConnectionContext";

import useGameData from '../../hooks/useGameData';
import useModal from '../../hooks/useModal';

function WaitingRoom(props) {
  const { players, gameId } = props;

  const connection = useContext(ConnectionContext);

  const {
    modalIsOpen,
    closeModal,
    openModal,
  } = useModal();


  const {
   game,
    startGame,
    setters,
  } = useGameData(gameId, connection)


<<<<<<< HEAD

=======
  const initialGame = {
    started: false,
    questions: [],
    params: { numQuestions: 5 },
    currentQ: 0,
  };
  const [game, setGame] = useState(initialGame);
  // helper function being passed into the options form ...
  // move it into a separate file
  const setOptions = (options) => {
    setGame({ ...game, params: { ...options } });
  };

  const startGame = () => {
    const { params } = game;

    console.log(`Start ${gameId} request sent to server!`);
    connection.current.emit("start_game", { params });
  };

  connection.current.on("game_started", (data) => {
    const { questions, params } = data;

    console.log(`${gameId} started from server!`);
    setGame((prev) => ({ ...prev, questions, started: true, params }));
  });

  connection.current.on("next_question", async (data) => {
    const { players, currentQ } = data;

    console.log("Server sent next Q, starting timeout");
    const timer = await setTimeout(() => {
      console.log(`${gameId} moved to question ${currentQ} from server!`);
      setGame((prev) => ({ ...prev, currentQ, players }));
      clearTimeout(timer);
    }, 2000);
  });

  connection.current.on("game_ended", (data) => {
    console.log(`${gameId} ended from server!`);
    setGame((prev) => ({ ...prev, started: false, currentQ: 0 }));
  });
>>>>>>> component/score-page

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
<<<<<<< HEAD
              <OptionsForm setters={setters} params={game.params} />
=======
              <OptionsForm options={game.params} setOptions={setOptions} />
>>>>>>> component/score-page
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
