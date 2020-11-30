import {useState} from 'react';
import "./PlayerListItem.scss";
import { FaUser } from "react-icons/fa";

import { IoIosCopy } from "react-icons/io";
import { CopyToClipboard } from 'react-copy-to-clipboard';

const classNames = require('classnames');

function PlayerListItem(props) {
  const [copied, setCopied] = useState(false)
  const { name, gameIdItem, playerItem } = props;

  const copyClass = classNames("copy-message", {"copy-message--show": copied});

  const setCopy = () => {
    if (copied === false){
      setCopied(true)
      setTimeout(() => {setCopied(false)}, 2000)
    }
  }

  return (
    <div className="player-container">
      {gameIdItem && (
        <CopyToClipboard text={name}>
          <div className="clipboard-content" onClick={() => setCopy(true)} >
            <p className="game-id">Game ID:</p>
            <h2 className="list-item-text game-id id-text"> {name}            <IoIosCopy   className="icon clipboard-icon" /><p className={copyClass} style={{display:'hidden', fontSize:'0.1rem' }}>Copied!</p></h2>
          </div>
        </CopyToClipboard>
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
