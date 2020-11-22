import "./WaitingRoom.scss";
import PlayerList from "../WaitingRoom/PlayerList";
import PlayerListItem from "../WaitingRoom/PlayerListItem";
import Button from "../Button";
import { FaCog } from "react-icons/fa";

function WaitingRoom(props) {
  const { players, gameId } = props;
  return (
    <main className="box-waiting">
      <div className="waiting-header">
        <FaCog className="icon" />
      </div>
      <h2>Let's Get Trivial</h2>

      <PlayerListItem className="alt-text" name={gameId} gameIdItem />
      <PlayerList players={players} />
      <Button gameRoom>Start Game >></Button>
    </main>
  );
}

export default WaitingRoom;
