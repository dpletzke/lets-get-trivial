import PlayerListItem from "./PlayerListItem";
import "./PlayerList.scss";

function PlayerList(props) {
  const { players } = props;
  const playerList = players.map((player, index) => (
    <div key={index}>
      <PlayerListItem name={player.name} playerItem />
    </div>
  ));
  return (
    <div className="playerList-container">
      <h2>Players</h2>
      <div className="players-scroll-container">{playerList}</div>
    </div>
  );
}

export default PlayerList;
