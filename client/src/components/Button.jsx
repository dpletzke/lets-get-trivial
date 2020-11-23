import "./Button.scss";
import { useContext } from "react";
import ConnectionContext from '../ConnectionContext'

const classNames = require("classnames");



function Button(props) {

  const connection = useContext(ConnectionContext);
  const btnClass = classNames("btn", {
    "btn--home": props.home,
    "btn--game-room": props.gameRoom,
  });

  return (
    <>
      <p>{connection.current.id}</p>
      <button onClick={props.onClick} className={btnClass}>
        {props.children}
      </button>
    </>
  );
}

export default Button;
