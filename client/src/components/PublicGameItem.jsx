import "./PublicGameItem.scss";

function PublicGameItem(props) {
  console.log(props);
  const { roomId, hostName, numUsers, key, setGameId, closeModal } = props;
  const clickHandler = (id) => {
    setGameId(id);
    console.log(id);
    closeModal();
  }
  return (
    <div className="game-id-container">
      <div>
        <p>{hostName}</p>
        <p> {numUsers}</p>
        <p className="game-id" onClick={() => clickHandler(roomId)}> {roomId}</p>
      </div>
    </div>
  );
}

export default PublicGameItem;
