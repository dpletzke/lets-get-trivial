import "./index.scss";
import PlayerList from "./PlayerList";
import PlayerListItem from "./PlayerListItem";
import Button from "../Button";
import ModalComponent from '../Modal'
import { FaCog } from "react-icons/fa";
import {useState} from 'react';
import { action } from "@storybook/addon-actions";

function WaitingRoom(props) {
  const [modalIsOpen,setIsOpen] = useState(false);
  function openModal() {
    console.log('openModal');
    setIsOpen(true);
  }
 
  function closeModal(){
    setIsOpen(false);
  }

  const { players, gameId } = props;
  return (
    <main className="box-waiting">
      <div className="waiting-header">
        <FaCog className="icon" onClick={openModal} />
      </div>
      <h2>Let's Get Trivial</h2>

      <PlayerListItem className="alt-text" name={gameId} gameIdItem />
      <PlayerList players={players} />
      <Button gameRoom>Start Game >></Button>
      <ModalComponent modalIsOpen={modalIsOpen} closeModal={closeModal}/>
    </main>
  );
}

export default WaitingRoom;
