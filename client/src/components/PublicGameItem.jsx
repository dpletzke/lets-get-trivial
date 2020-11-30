import "./PublicGameItem.scss";
import Button from '../components/Button';
import {FaUser} from 'react-icons/fa';

function PublicGameItem(props) {
  const { roomId, hostName, numUsers, key, setGameId, closeModal } = props;
  const clickHandler = (id) => {
    setGameId(id);
    closeModal();
  }
  return (
    <div className="game-id-container">
  <Button onClick={() => clickHandler(roomId)} publicGames>{hostName}</Button>
        <div className="box__users">
        <FaUser className="icon__small"/>
        <p> {numUsers}</p>
        </div>
    </div>
  );
}

export default PublicGameItem;
