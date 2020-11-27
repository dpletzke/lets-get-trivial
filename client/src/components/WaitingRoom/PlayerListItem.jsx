import "./PlayerListItem.scss";
import { FaUser } from "react-icons/fa";

function PlayerListItem(props) {
  const { name, gameIdItem, playerItem } = props;

  return (
    <div className="player-container">
      {gameIdItem && <p className="game-id">Game ID:</p>}
      {gameIdItem && (
        <h2 className="list-item-text game-id id-text"> {name}</h2>
      )}
      {playerItem && (
        <p className="list-item-text">
          <FaUser className="user-icon" />

          {name}
        </p>
      )}
    </div>
  );
}

export default PlayerListItem;
