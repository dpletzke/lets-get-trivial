import "./Button.scss";
import { useContext } from "react";
import ConnectionContext from '../ConnectionContext'

const classNames = require("classnames");



function Button(props) {

  const connection = useContext(ConnectionContext);
  const btnClass = classNames("btn", {
    "btn--home": props.home,
    "btn--game-room": props.gameRoom,
    "btn--publicGames": props.publicGames,
  });

  const askForCategories = () => {
    // console.log(connection.current);
    connection.current.emit('get_roomIds');
  }

  return (
    <>
      <button onClick={props.onClick} className={btnClass}>
        {props.children}
      </button>
      {/* <button onClick={askForCategories}>
        Get Categories
      </button> */}
    </>
  );
}

export default Button;
