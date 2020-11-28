
import './PublicGameItem.scss'

function PublicGameItem(props) {
  console.log(props);
  const { roomId, hostName, numUsers, key } = props;
  return (

    <div className="game-id-container">
        <div>
          <p>
          {hostName}</p>
          <p>players: {numUsers}</p>
          <p className="game-id"> {roomId}</p>  
          </div>  
    </div>
  );
}

export default PublicGameItem;