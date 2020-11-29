import "./PublicGameItem.scss";
import Button from '../components/Button';
import {FaUser} from 'react-icons/fa';

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
        <p>{hostName}</p>
  <Button onClick={() => clickHandler(roomId)} home>{roomId}</Button>
        <div className="box__users">
        <FaUser className="icon__small"/>
        <p> {numUsers}</p>
        </div>
    </div>
  );
}

export default PublicGameItem;
