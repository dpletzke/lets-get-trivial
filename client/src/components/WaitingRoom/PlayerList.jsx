import PlayerListItem from "./PlayerListItem";
import "./PlayerList.scss";

function PlayerList(props) {
  const { players } = props;
  const playerList = players.map((player) => (
    <PlayerListItem name={player.name} playerItem />
  ));
  return (
    <div className="playerList-container">
      <h2>Players</h2>
      {playerList}
    </div>
  );
}

export default PlayerList;
