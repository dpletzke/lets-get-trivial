import "./PlayerListItem.scss";
import { FaUser } from "react-icons/fa";

// const playerObj = {
//   name: "Soren",
// };

function PlayerListItem(props) {
  const { name, gameIdItem, playerItem } = props;

  return (
    <div className="player-container">
      {gameIdItem && <p>Game ID:</p>}
      {gameIdItem && <h2 className="list-item-text"> {name}</h2>}
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
